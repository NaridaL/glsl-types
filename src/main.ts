// @ts-ignore
// import { parse } from './glsles1.0'
// @ts-ignore
import {glsles as lexer} from './glsles.lexer'
import {Parser, Grammar} from 'nearley'
import * as glsl from './glslNearleyRules'
import { InitDeclaratorList, StructDeclaration, DeclaratorListDeclarator, InterfaceBlock } from './AST';
glsl.ParserRules.forEach((r: any) => !r.postprocess && r.symbols.length == 1 && (r.postprocess = ((x: {}[]) => x[0])))

type Q = 'uniform' | 'varying' | 'attribute' | 'in' | 'out'
type R = {
	globalDeclarations: {
		declarators: {
			type: 'declarator_item',
			arraySize: number | undefined
			name: {
				type: 'identifier',
				name: string
			}
			isArray: boolean
		}[]
		type: 'declarator',
		typeAttribute: {
			type: 'type',
			name: string,
			qualifier: Q | Q[]
		}
	}[],
	wroteGLPosition: boolean
}
export type NameTypeMap = { [name: string]: string }
export type Result = {
	in_: NameTypeMap,
	uniform: NameTypeMap,
	out: NameTypeMap,
	type: 'vertex' | 'fragment'
}
export function getTypings(shaderSource: string) {
	const state: glsl.State = {}
	glsl.setState(state)
	const parser = new Parser(Grammar.fromCompiled(glsl));
	// parser.yy.state = {
	// 	nodes: [],
	// 	addAstNode(node: any) {
	// 		this.nodes.push(node)
	// 	}
	// }
	// parser.lexer = lexer
	 parser.feed(shaderSource)
	 if (parser.results.length != 1) throw new Error()
	 const r = parser.results[0]
	const wroteGLPosition = state.wroteGLPosition
	const nodes = parser.results
	const result: Result = {
		in_: {},
		uniform: {},
		out: {},
		type: wroteGLPosition ? 'vertex' : 'fragment'
	}
	const structs: any = {}
	function descriptors(m: InitDeclaratorList) {
		const result: any = {}
		const type = m.type
		if ('IDENTIFIER' == type.type || type instanceof StructDeclaration) {
			const struct = 'IDENTIFIER' == type.type ? structs[type.value] : type
			if (!struct) {
				throw new Error('struct ' + type.value + ' is not edefined')
			}
			for (const declarator of struct.members) {
				const ds = descriptors(declarator)
				for (const d of m.declarators) {
					if (d.isArray) {
						const size = d.arraySize || 0
						for (let i = 0; i < size; i++) {
							for (const k in ds) {
								result[d.name + '[' + i + '].' + k] = ds[k]
							}
						}
					} else {
						for (const k in ds) {
							result[d.name.value + '.' + k] = ds[k]
						}
					}
				}

			}
		} else if ('TYPE' == type.type) {
			for (const d of m.declarators) {
				const name = d.name.value + (d.isArray ? '[0]' : '')
				result[name] = type.value
			}
		}
		return result
	}
	for (const node of r) {
		if (node instanceof InitDeclaratorList || node instanceof InterfaceBlock) {
			if (node.type instanceof StructDeclaration && node.type.name) {
				structs[node.type.name.value] = node.type
			}
			const storage = node instanceof InitDeclaratorList ? node.type.storage : node.storage
			if (!storage) continue
			const storage_type = storage.type
			let interface2: 'in_' | 'out' | 'uniform' | undefined = undefined
			if ('UNIFORM' == storage_type) {
				interface2 = 'uniform'
			} else if ('ATTRIBUTE' == storage_type || 'IN' == storage_type || 'VARYING' == storage_type && !wroteGLPosition) {
				interface2 = 'in_'
			} else if ('OUT' == storage_type || 'VARYING' == storage_type && wroteGLPosition) {
				interface2 = 'out'
			}
			if (!interface2) continue
			if (node instanceof InitDeclaratorList) {
				Object.assign(result[interface2], descriptors(node))
			} else {
				for (const d of node.members) {
					const ds = descriptors(d)
					for (const ddn in ds) {
						result[interface2][(node.instanceName ? node.name.value + '.' : '') + ddn] = ds[ddn]
					}
				}
			}
		}
	}
	return result
}

export function getTypeScriptDTS({ in_, uniform, out, type }: Result, shaderType = 'ShaderSource', module: string | false = 'tsgl', ) {
	let result = '// These types were generated automatically by glsl-types\n'
	result += '// tslint:disable\n'
	if (module) {
		result += `import { ${shaderType} } from "${module}"\n`
	}
	result += `declare const src: ${shaderType}<{\n`
	for (const name of Object.keys(uniform)) {
		result += '\t' + JSON.stringify(name) + ': "' + uniform[name] + '",\n'
	}
	result += '}, {\n'
	for (const name of Object.keys(in_)) {
		result += '\t' + JSON.stringify(name) + ': "' + in_[name] + '",\n'
	}
	result += '}, {\n'
	for (const name of Object.keys(out)) {
		result += '\t' + JSON.stringify(name) + ': "' + out[name] + '",\n'
	}
	result += '}, ' + JSON.stringify(type) + '>\n'
	result += 'export = src'
	return result
}