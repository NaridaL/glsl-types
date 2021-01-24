//@tsignore
import { makeLexer as ml } from "./glslLexer"
import { Lexer } from "./glslNearleyRules"
import { Token } from "moo"

export function makeLexer(): Lexer {
  const lexer = ml()
  let token: Token | undefined = undefined
  // let nextToken: Token | undefined = undefined
  function accept(type: string): Token {
    if (!token || type !== token.type) {
      throw new Error()
    }
    const result = token
    next()
    return result
  }
  type Def = {
    name: Token
    args: Token[] | undefined
    def: Token[]
  }
  let queue: Token[]
  let DEFS: { [name: string]: Def }
  function next() {
    token = lexer.next()
    // nextToken = lexer.next()
  }
  function tokenHasType(x: string) {
    return token && token.type == x
  }
  function parseArgs(): Token[] | undefined {
    let args: Token[] | undefined = undefined
    if (tokenHasType("LEFT_PAREN")) {
      next()
      args = []
      if (tokenHasType("IDENTIFIER")) {
        args.push(token!)
        next()
      }
      while (tokenHasType("COMMA")) {
        next()
        args.push(accept("IDENTIFIER"))
      }
      accept("RIGHT_PAREN")
    }
    return args
  }
  function expandMacro(m: Token) {
    const args = parseArgs()
    const def = DEFS[m.value]
    if ((undefined === args) !== (undefined === def.args)) {
      // usage has args and def not, or vice versa:
      queue.push(m)
    } else if (undefined === args) {
      // no args
      queue.push(...def.def)
    } else {
      // args
      if (args.length !== def.args!.length) {
        throw new Error("no of args does not match def")
      }
      for (const d of def.def) {
        const argIndex =
          "IDENTIFIER" == d.type
            ? def.args!.findIndex((a) => a.value == d.value)
            : -1
        queue.push(-1 == argIndex ? d : args[argIndex])
      }
    }
  }
  function parseDefine() {
    accept("PRE_DEFINE")
    const def: Def = {} as any
    def.name = accept("IDENTIFIER")
    def.args = parseArgs()
    def.def = []
    while (token && "NL" != token.type) {
      def.def.push(token)
      next()
    }
    DEFS[def.name.value] = def
  }
  function evalConstExpression() {
    if (!token) throw new Error()
    switch (token.type) {
      case "IDENTIFIER":
        const def = DEFS[token.value]
        if (!def) throw new Error(token.value + " is not define.")
        if (undefined !== def.args) throw new Error("cannot have args")
        const val = parseInt(token.value)
        next()
        return val
      default:
        throw new Error()
    }
  }
  function parseIf() {
    accept("PRE_IF")
    const cond = evalConstExpression()
    if (!cond) {
      while (token && "PRE_ENDIF" != token.type) {
        next()
      }
      next()
    }
  }
  return Object.assign(Object.create(lexer), {
    next() {
      while (true) {
        if (queue.length !== 0) {
          return queue.shift()
        }
        next()
        if (!token) return token
        // returns a token object, which could have fields for line number, etc. Importantly, a token object must have a value attribute.
        switch (token.type) {
          case "NL":
            break
          case "PRE_DEFINE":
            parseDefine()
            break
          case "IDENTIFIER":
            if (DEFS[token.value]) {
              expandMacro(token)
            } else {
              return token
            }
            break
          case "PRE_IF":
            parseIf()
            break
          default:
            return token
        }
      }
    },
    save() {
      // returns an info object that describes the current state of the lexer. nearley places no restrictions on this object.
      return {
        sub: lexer.save(),
        defs: Object.assign({}, DEFS),
        queue: queue.slice(),
      }
    },
    reset(chunk: string, info?: any) {
      if (info) throw new Error()
      // sets the internal buffer of the lexer to chunk, and restores its state to a state returned by save().
      lexer.reset(chunk, info && info.sub)
      DEFS = info ? info.defs : {}
      queue = info ? info.queue : []
    },
  })
}
