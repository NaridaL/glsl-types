import { getTypings, NameTypeMap, getTypeScriptDTS, Result } from '../src/main'
import { assert } from 'chai'
import * as fs from 'fs'

function test(shader: string, result: Partial<Result>, type?: 'fragment' | 'vertex') {
	const globals = getTypings(shader)
	type && assert.equal(globals.type, type)
	assert.deepEqual(globals.in_, result.in_ || {}, 'in_')
	assert.deepEqual(globals.out, result.out || {}, 'out')
	assert.deepEqual(globals.uniform, result.uniform || {}, 'uniform')
	// console.log(getTypeScriptDTS(globals))
}

describe("parsing uniforms", () => {
	it("should work with a basic type", () => {
		const shader = "uniform vec4 u, v;"
		test(shader, { uniform: { 'u': 'vec4', 'v': 'vec4' } })
	})
	it("should work with an array of basic type", () => {
		const shader = "uniform vec4 u[2];"
		test(shader, { uniform: { 'u[0]': 'vec4' } })
	})
	it("should work with an array of basic type with initializer list", () => {
		const shader = "uniform vec4 u[] = vec4[](vec4(0.0), vec4(2.0));"
		test(shader, { uniform: { 'u[0]': 'vec4' } })
	})
	it("should work with a struct type", () => {
		const shader = "struct S { float foo; vec4 bar[2]; }; uniform S u;"
		test(shader, { uniform: { 'u.foo': 'float', 'u.bar[0]': 'vec4' } })
	})
	it("should work with an inline struct type", () => {
		const shader = "uniform struct { float foo; vec4 bar[2]; } u;"
		test(shader, { uniform: { 'u.foo': 'float', 'u.bar[0]': 'vec4' } })
	})
	it("should work with an array of structs", () => {
		const shader = "uniform struct { float f; } u[2];"
		test(shader, { uniform: { 'u[0].f': 'float', 'u[1].f': 'float' } })
	})
	it("should work with a uniform block without an instance", () => {
		const shader = "uniform Block { float foo; };"
		test(shader, { uniform: { 'foo': 'float' } })
	})
	it("should work with a uniform block with an instance", () => {
		const shader = "uniform Block { float foo; } i;"
		test(shader, { uniform: { 'Block.foo': 'float' } })
	})
	it("should work with a #define macro", () => {
		const shader = "#define N 2\nuniform struct { float foo; } u[N];"
		test(shader, { uniform: { 'u[0].foo': 'float', 'u[1].foo': 'float' } })
	})
})
describe("parser", () => {
	it("should work with a function call initializer", () => {
		const shader = "float a = foo();"
		test(shader, {})
	})
	it("should work with #version", () => {
		const shader = "#version 300 es\nfloat f;"
		test(shader, {})
	})
})
describe("complex examples", () => {
	it("should work with a fragment shader sampler2D uniforms and array uniforms and varying vec2", () => {
		const shader = `
			precision mediump float;
			const int NUM_PS = 3;
			float q = 0.01;
			uniform vec4 ps[NUM_PS];
			uniform sampler2D texture;
			uniform sampler2D texture2;
			varying vec2 coord;
			void main() {
				//gl_FragColor = vec4(coord.x, coord.y, 0, 1);
				gl_FragColor = vec4(0.8,0.8,0.8,1);
				float totalForce = 0.0;
				for (int i = 0; i < NUM_PS; i++) {
					vec4 p = ps[i];
					float pCharge = p.w;
					vec2 coordToP = p.xy - coord.xy;
					float r = length(coordToP);
					float partialForce = pCharge * q / r / r;
					totalForce += partialForce;
				}
				// const float INTERVAL = 0.5;
				// float c = 1.0 - pow((mod(totalForce, INTERVAL) * 2.0 / INTERVAL - 1.0), 8.0);
				// gl_FragColor = vec4(c, c, c, 1);
			}
		`
		test(shader, {
			uniform: {
				texture: 'sampler2D',
				texture2: 'sampler2D',
				'ps[0]': 'vec4'
			},
			in_: {
				coord: 'vec2',
			}
		}, 'fragment')
	})
	it("should work with a vertex shader with uniform mat4 and attribute vec4 ", () => {
		const shader = `
			precision mediump float;
			uniform mat4 ts_ModelViewProjectionMatrix;
			attribute vec4 ts_Vertex;
			void main() {
				gl_Position = ts_ModelViewProjectionMatrix * ts_Vertex;
			}`
		test(shader, {
			uniform: {
				ts_ModelViewProjectionMatrix: 'mat4',
			},
			in_: {
				ts_Vertex: 'vec4'
			}
		}, 'vertex')
	})
	it("should work with invariant varying", () => {
		const shader = `
			invariant varying vec4 color;
			void main() {
				gl_Position = ts_ModelViewProjectionMatrix * ts_Vertex;
			}`
		test(shader, {
			out: {
				color: 'vec4'
			}
		}, 'vertex')
	})
	it("should work with layout declarations", () => {
		// https://www.khronos.org/opengl/wiki/Layout_Qualifier_(GLSL)
		const shader = `
			layout(location = 2) in vec3 values[4];
			layout(location = 0, index = 0) out vec4 outputColor0;
			layout(location = 0, index = 1) out vec4 outputColor1;
			layout(location = 0) out vec4 color;
			layout(location = 1) out vec2 texCoord;
			layout(location = 2) out vec3 normal;
			layout(location = 0) in vec4 diffuseAlbedo;
			layout(location = 1) in vec2 texCoord;
			layout(location = 2) in vec3 cameraSpaceNormal;


			struct OutData {
				vec3 data1;
				vec4 data2;
				float val[3];
			};

			layout(location = 0) out vec3 vals[4];    // Consumes 4 locations
			layout(location = 4) out OutData myOut;   // Consumes 6 locations. dvec4 uses 2, and "val[3]" uses 3 total
			layout(location = 10) out vec2 texCoord;  // Consumes 1 location

			layout(location = 0) out Block {
				vec2 first;
				vec4 second[3];
				vec4 third;
				layout(location = 10) vec2 fourth;
				vec4 fifth;
				layout(location = 8) vec3 sixth;
				vec3 seventh;
			};
			layout(location = 0) out vec2 arr1[5];
			layout(location = 0, component = 2) out vec2 arr2[4]; //Different sizes are fine.
			layout(location = 4, component = 2) out float val;    //A non-array takes the last two fields from location 4.

			layout(xfb_buffer = 0) out Data
			{
			layout(xfb_offset = 0) float val1;
			layout(xfb_offset = 4) vec4 val2;
			layout(xfb_offset = 16) float val3;  // Compiler error. val2 covers bytes on the range [4, 20).
			};
		`
		test(shader, {
			in_: {
				'values[0]': 'vec3',
				'diffuseAlbedo': 'vec4',
				'texCoord': 'vec2',
				'cameraSpaceNormal': 'vec3',
			},
			out: {
				"arr1[0]": "vec2",
				"arr2[0]": "vec2",
				"color": "vec4",
				"fifth": "vec4",
				"first": "vec2",
				"fourth": "vec2",
				"myOut.data1": "vec3",
				"myOut.data2": "vec4",
				"myOut.val[0]": "float",
				"normal": "vec3",
				"outputColor0": "vec4",
				"outputColor1": "vec4",
				"second[0]": "vec4",
				"seventh": "vec3",
				"sixth": "vec3",
				"texCoord": "vec2",
				"third": "vec4",
				"val": "float",
				"vals[0]": "vec3",
				'val1': 'float',
				'val2': 'vec4',
				'val3': 'float',
			}
		}, 'fragment')
	})
	it("should work with a complex example", () => {
		const shader = `
		/**
		* Example Fragment Shader
		* Sets the color and alpha of the pixel by setting gl_FragColor
		*/

		// Set the precision for data types used in this shader
		precision highp float;
		precision highp int;

		// Default THREE.js uniforms available to both fragment and vertex shader
		uniform mat4 modelMatrix;
		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;
		uniform mat4 viewMatrix;
		uniform mat3 normalMatrix;

		// Default uniforms provided by ShaderFrog.
		uniform vec3 cameraPosition;
		uniform float time;

		// A uniform unique to this shader. You can modify it to the using the form
		// below the shader preview. Any uniform you add is automatically given a form
		uniform vec3 color;
		uniform vec3 lightPosition;

		// Example varyings passed from the vertex shader
		varying vec3 vPosition;
		varying vec3 vNormal;
		varying vec2 vUv;
		varying vec2 vUv2;

		void main() {

			// Calculate the real position of this pixel in 3d space, taking into account
			// the rotation and scale of the model. It's a useful formula for some effects.
			// This could also be done in the vertex shader
			vec3 worldPosition = ( modelMatrix * vec4( vPosition, 1.0 )).xyz;

			// Calculate the normal including the model rotation and scale
			vec3 worldNormal = normalize( vec3( modelMatrix * vec4( vNormal, 0.0 ) ) );

			vec3 lightVector = normalize( lightPosition - worldPosition );

			// An example simple lighting effect, taking the dot product of the normal
			// (which way this pixel is pointing) and a user generated light position
			float brightness = dot( worldNormal, lightVector );

			// Fragment shaders set the gl_FragColor, which is a vector4 of
			// ( red, green, blue, alpha ).
			gl_FragColor = vec4( color * brightness, 1.0 );

		}`
		test(shader, {
			in_: {
				"vNormal": "vec3",
				"vPosition": "vec3",
				"vUv": "vec2",
				"vUv2": "vec2",
			},
			uniform: {
				"cameraPosition": "vec3",
				"color": "vec3",
				"lightPosition": "vec3",
				"modelMatrix": "mat4",
				"modelViewMatrix": "mat4",
				"normalMatrix": "mat3",
				"projectionMatrix": "mat4",
				"time": "float",
				"viewMatrix": "mat4",
			},
		}, 'fragment')
	})
	it("should work with geomechanical", () => {
		const shader = fs.readFileSync(__dirname + '/geomechanical.glsl', 'utf8')
		test(shader, {}, 'fragment')
	})
	it("should work with discard", () => {
		const shader = "void main() {discard;}"
		test(shader, {}, 'fragment')
	})
})