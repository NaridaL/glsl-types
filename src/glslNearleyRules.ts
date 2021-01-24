// Generated automatically by nearley, version 2.11.1
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any {
  return d[0]
}
declare var VERSION: any
declare var IDENTIFIER: any
declare var INTCONSTANT: any
declare var UINTCONSTANT: any
declare var FLOATCONSTANT: any
declare var BOOLCONSTANT: any
declare var LEFT_PAREN: any
declare var RIGHT_PAREN: any
declare var LEFT_BRACKET: any
declare var RIGHT_BRACKET: any
declare var DOT: any
declare var INC_OP: any
declare var DEC_OP: any
declare var VOID: any
declare var COMMA: any
declare var PLUS: any
declare var DASH: any
declare var BANG: any
declare var TILDE: any
declare var STAR: any
declare var SLASH: any
declare var PERCENT: any
declare var LEFT_OP: any
declare var RIGHT_OP: any
declare var LEFT_ANGLE: any
declare var RIGHT_ANGLE: any
declare var LE_OP: any
declare var GE_OP: any
declare var EQ_OP: any
declare var NE_OP: any
declare var AMPERSAND: any
declare var CARET: any
declare var VERTICAL_BAR: any
declare var AND_OP: any
declare var XOR_OP: any
declare var OR_OP: any
declare var QUESTION: any
declare var COLON: any
declare var EQUAL: any
declare var MUL_ASSIGN: any
declare var DIV_ASSIGN: any
declare var MOD_ASSIGN: any
declare var ADD_ASSIGN: any
declare var SUB_ASSIGN: any
declare var LEFT_ASSIGN: any
declare var RIGHT_ASSIGN: any
declare var AND_ASSIGN: any
declare var XOR_ASSIGN: any
declare var OR_ASSIGN: any
declare var PRECISION: any
declare var LEFT_BRACE: any
declare var RIGHT_BRACE: any
declare var IN: any
declare var OUT: any
declare var INOUT: any
declare var INVARIANT: any
declare var SMOOTH: any
declare var FLAT: any
declare var LAYOUT: any
declare var CONST: any
declare var CENTROID: any
declare var UNIFORM: any
declare var VARYING: any
declare var ATTRIBUTE: any
declare var TYPE: any
declare var HIGH_PRECISION: any
declare var MEDIUM_PRECISION: any
declare var LOW_PRECISION: any
declare var STRUCT: any
declare var SEMICOLON: any
declare var IF: any
declare var ELSE: any
declare var SWITCH: any
declare var CASE: any
declare var DEFAULT: any
declare var WHILE: any
declare var DO: any
declare var FOR: any
declare var CONTINUE: any
declare var BREAK: any
declare var RETURN: any
declare var DISCARD: any

import { makeLexer } from "./preprocessor"
const lexer = makeLexer()
function scd(x: any[]) {
  return x[1]
}
import {
  DeclaratorListDeclarator,
  InitDeclaratorList,
  StructDeclaration,
  InterfaceBlock,
} from "./AST"
export interface State {
  wroteGLPosition?: boolean
}
let state: State = undefined!
export function setState(s: State) {
  state = s
}

export interface Token {
  value: any
  [key: string]: any
}

export interface Lexer {
  reset: (chunk: string, info: any) => void
  next: () => Token | undefined
  save: () => any
  formatError: (token: Token) => string
  has: (tokenType: string) => boolean
}

export interface NearleyRule {
  name: string
  symbols: NearleySymbol[]
  postprocess?: (d: any[], loc?: number, reject?: {}) => any
}

export type NearleySymbol =
  | string
  | { literal: any }
  | { test: (token: any) => boolean }

export var Lexer: Lexer | undefined = lexer

export var ParserRules: NearleyRule[] = [
  {
    name: "translation_unit$ebnf$1",
    symbols: [lexer.has("VERSION") ? { type: "VERSION" } : VERSION],
    postprocess: id,
  },
  { name: "translation_unit$ebnf$1", symbols: [], postprocess: () => null },
  { name: "translation_unit$ebnf$2", symbols: [] },
  {
    name: "translation_unit$ebnf$2",
    symbols: ["translation_unit$ebnf$2", "external_declaration"],
    postprocess: (d) => d[0].concat([d[1]]),
  },
  {
    name: "translation_unit",
    symbols: ["translation_unit$ebnf$1", "translation_unit$ebnf$2"],
    postprocess: scd,
  },
  {
    name: "variable_identifier",
    symbols: [lexer.has("IDENTIFIER") ? { type: "IDENTIFIER" } : IDENTIFIER],
  },
  { name: "primary_expression", symbols: ["variable_identifier"] },
  {
    name: "primary_expression",
    symbols: [lexer.has("INTCONSTANT") ? { type: "INTCONSTANT" } : INTCONSTANT],
  },
  {
    name: "primary_expression",
    symbols: [
      lexer.has("UINTCONSTANT") ? { type: "UINTCONSTANT" } : UINTCONSTANT,
    ],
  },
  {
    name: "primary_expression",
    symbols: [
      lexer.has("FLOATCONSTANT") ? { type: "FLOATCONSTANT" } : FLOATCONSTANT,
    ],
  },
  {
    name: "primary_expression",
    symbols: [
      lexer.has("BOOLCONSTANT") ? { type: "BOOLCONSTANT" } : BOOLCONSTANT,
    ],
  },
  {
    name: "primary_expression",
    symbols: [
      lexer.has("LEFT_PAREN") ? { type: "LEFT_PAREN" } : LEFT_PAREN,
      "expression",
      lexer.has("RIGHT_PAREN") ? { type: "RIGHT_PAREN" } : RIGHT_PAREN,
    ],
  },
  { name: "postfix_expression", symbols: ["primary_expression"] },
  {
    name: "postfix_expression",
    symbols: [
      "postfix_expression",
      lexer.has("LEFT_BRACKET") ? { type: "LEFT_BRACKET" } : LEFT_BRACKET,
      "integer_expression",
      lexer.has("RIGHT_BRACKET") ? { type: "RIGHT_BRACKET" } : RIGHT_BRACKET,
    ],
  },
  { name: "postfix_expression", symbols: ["function_call"] },
  {
    name: "postfix_expression",
    symbols: [
      "postfix_expression",
      lexer.has("DOT") ? { type: "DOT" } : DOT,
      lexer.has("IDENTIFIER") ? { type: "IDENTIFIER" } : IDENTIFIER,
    ],
  },
  {
    name: "postfix_expression",
    symbols: [
      "postfix_expression",
      lexer.has("INC_OP") ? { type: "INC_OP" } : INC_OP,
    ],
  },
  {
    name: "postfix_expression",
    symbols: [
      "postfix_expression",
      lexer.has("DEC_OP") ? { type: "DEC_OP" } : DEC_OP,
    ],
  },
  { name: "integer_expression", symbols: ["expression"] },
  { name: "function_call", symbols: ["function_call_or_method"] },
  { name: "function_call_or_method", symbols: ["function_call_generic"] },
  {
    name: "function_call_or_method",
    symbols: [
      "postfix_expression",
      lexer.has("DOT") ? { type: "DOT" } : DOT,
      "function_call_generic",
    ],
  },
  {
    name: "function_call_generic",
    symbols: [
      "function_call_header_with_parameters",
      lexer.has("RIGHT_PAREN") ? { type: "RIGHT_PAREN" } : RIGHT_PAREN,
    ],
  },
  {
    name: "function_call_generic",
    symbols: [
      "function_call_header_no_parameters",
      lexer.has("RIGHT_PAREN") ? { type: "RIGHT_PAREN" } : RIGHT_PAREN,
    ],
  },
  {
    name: "function_call_header_no_parameters",
    symbols: [
      "function_call_header",
      lexer.has("VOID") ? { type: "VOID" } : VOID,
    ],
  },
  {
    name: "function_call_header_no_parameters",
    symbols: ["function_call_header"],
  },
  {
    name: "function_call_header_with_parameters",
    symbols: ["function_call_header", "assignment_expression"],
  },
  {
    name: "function_call_header_with_parameters",
    symbols: [
      "function_call_header_with_parameters",
      lexer.has("COMMA") ? { type: "COMMA" } : COMMA,
      "assignment_expression",
    ],
  },
  {
    name: "function_call_header",
    symbols: [
      "function_identifier",
      lexer.has("LEFT_PAREN") ? { type: "LEFT_PAREN" } : LEFT_PAREN,
    ],
  },
  { name: "function_identifier", symbols: ["type_specifier"] },
  { name: "unary_expression", symbols: ["postfix_expression"] },
  {
    name: "unary_expression",
    symbols: [
      lexer.has("INC_OP") ? { type: "INC_OP" } : INC_OP,
      "unary_expression",
    ],
  },
  {
    name: "unary_expression",
    symbols: [
      lexer.has("DEC_OP") ? { type: "DEC_OP" } : DEC_OP,
      "unary_expression",
    ],
  },
  { name: "unary_expression", symbols: ["unary_operator", "unary_expression"] },
  {
    name: "unary_operator",
    symbols: [lexer.has("PLUS") ? { type: "PLUS" } : PLUS],
  },
  {
    name: "unary_operator",
    symbols: [lexer.has("DASH") ? { type: "DASH" } : DASH],
  },
  {
    name: "unary_operator",
    symbols: [lexer.has("BANG") ? { type: "BANG" } : BANG],
  },
  {
    name: "unary_operator",
    symbols: [lexer.has("TILDE") ? { type: "TILDE" } : TILDE],
  },
  { name: "multiplicative_expression", symbols: ["unary_expression"] },
  {
    name: "multiplicative_expression",
    symbols: [
      "multiplicative_expression",
      lexer.has("STAR") ? { type: "STAR" } : STAR,
      "unary_expression",
    ],
  },
  {
    name: "multiplicative_expression",
    symbols: [
      "multiplicative_expression",
      lexer.has("SLASH") ? { type: "SLASH" } : SLASH,
      "unary_expression",
    ],
  },
  {
    name: "multiplicative_expression",
    symbols: [
      "multiplicative_expression",
      lexer.has("PERCENT") ? { type: "PERCENT" } : PERCENT,
      "unary_expression",
    ],
  },
  { name: "additive_expression", symbols: ["multiplicative_expression"] },
  {
    name: "additive_expression",
    symbols: [
      "additive_expression",
      lexer.has("PLUS") ? { type: "PLUS" } : PLUS,
      "multiplicative_expression",
    ],
  },
  {
    name: "additive_expression",
    symbols: [
      "additive_expression",
      lexer.has("DASH") ? { type: "DASH" } : DASH,
      "multiplicative_expression",
    ],
  },
  { name: "shift_expression", symbols: ["additive_expression"] },
  {
    name: "shift_expression",
    symbols: [
      "shift_expression",
      lexer.has("LEFT_OP") ? { type: "LEFT_OP" } : LEFT_OP,
      "additive_expression",
    ],
  },
  {
    name: "shift_expression",
    symbols: [
      "shift_expression",
      lexer.has("RIGHT_OP") ? { type: "RIGHT_OP" } : RIGHT_OP,
      "additive_expression",
    ],
  },
  { name: "relational_expression", symbols: ["shift_expression"] },
  {
    name: "relational_expression",
    symbols: [
      "relational_expression",
      lexer.has("LEFT_ANGLE") ? { type: "LEFT_ANGLE" } : LEFT_ANGLE,
      "shift_expression",
    ],
  },
  {
    name: "relational_expression",
    symbols: [
      "relational_expression",
      lexer.has("RIGHT_ANGLE") ? { type: "RIGHT_ANGLE" } : RIGHT_ANGLE,
      "shift_expression",
    ],
  },
  {
    name: "relational_expression",
    symbols: [
      "relational_expression",
      lexer.has("LE_OP") ? { type: "LE_OP" } : LE_OP,
      "shift_expression",
    ],
  },
  {
    name: "relational_expression",
    symbols: [
      "relational_expression",
      lexer.has("GE_OP") ? { type: "GE_OP" } : GE_OP,
      "shift_expression",
    ],
  },
  { name: "equality_expression", symbols: ["relational_expression"] },
  {
    name: "equality_expression",
    symbols: [
      "equality_expression",
      lexer.has("EQ_OP") ? { type: "EQ_OP" } : EQ_OP,
      "relational_expression",
    ],
  },
  {
    name: "equality_expression",
    symbols: [
      "equality_expression",
      lexer.has("NE_OP") ? { type: "NE_OP" } : NE_OP,
      "relational_expression",
    ],
  },
  { name: "and_expression", symbols: ["equality_expression"] },
  {
    name: "and_expression",
    symbols: [
      "and_expression",
      lexer.has("AMPERSAND") ? { type: "AMPERSAND" } : AMPERSAND,
      "equality_expression",
    ],
  },
  { name: "exclusive_or_expression", symbols: ["and_expression"] },
  {
    name: "exclusive_or_expression",
    symbols: [
      "exclusive_or_expression",
      lexer.has("CARET") ? { type: "CARET" } : CARET,
      "and_expression",
    ],
  },
  { name: "inclusive_or_expression", symbols: ["exclusive_or_expression"] },
  {
    name: "inclusive_or_expression",
    symbols: [
      "inclusive_or_expression",
      lexer.has("VERTICAL_BAR") ? { type: "VERTICAL_BAR" } : VERTICAL_BAR,
      "exclusive_or_expression",
    ],
  },
  { name: "logical_and_expression", symbols: ["inclusive_or_expression"] },
  {
    name: "logical_and_expression",
    symbols: [
      "logical_and_expression",
      lexer.has("AND_OP") ? { type: "AND_OP" } : AND_OP,
      "inclusive_or_expression",
    ],
  },
  { name: "logical_xor_expression", symbols: ["logical_and_expression"] },
  {
    name: "logical_xor_expression",
    symbols: [
      "logical_xor_expression",
      lexer.has("XOR_OP") ? { type: "XOR_OP" } : XOR_OP,
      "logical_and_expression",
    ],
  },
  { name: "logical_or_expression", symbols: ["logical_xor_expression"] },
  {
    name: "logical_or_expression",
    symbols: [
      "logical_or_expression",
      lexer.has("OR_OP") ? { type: "OR_OP" } : OR_OP,
      "logical_xor_expression",
    ],
  },
  { name: "conditional_expression", symbols: ["logical_or_expression"] },
  {
    name: "conditional_expression",
    symbols: [
      "logical_or_expression",
      lexer.has("QUESTION") ? { type: "QUESTION" } : QUESTION,
      "expression",
      lexer.has("COLON") ? { type: "COLON" } : COLON,
      "assignment_expression",
    ],
  },
  { name: "assignment_expression", symbols: ["conditional_expression"] },
  {
    name: "assignment_expression",
    symbols: [
      "unary_expression",
      "assignment_operator",
      "assignment_expression",
    ],
    postprocess: ([left, op, right]) => {
      if (
        op.type == "EQUAL" &&
        left &&
        left.type == "IDENTIFIER" &&
        left.value == "gl_Position"
      ) {
        state.wroteGLPosition = true
      }
    },
  },
  {
    name: "assignment_operator",
    symbols: [lexer.has("EQUAL") ? { type: "EQUAL" } : EQUAL],
  },
  {
    name: "assignment_operator",
    symbols: [lexer.has("MUL_ASSIGN") ? { type: "MUL_ASSIGN" } : MUL_ASSIGN],
  },
  {
    name: "assignment_operator",
    symbols: [lexer.has("DIV_ASSIGN") ? { type: "DIV_ASSIGN" } : DIV_ASSIGN],
  },
  {
    name: "assignment_operator",
    symbols: [lexer.has("MOD_ASSIGN") ? { type: "MOD_ASSIGN" } : MOD_ASSIGN],
  },
  {
    name: "assignment_operator",
    symbols: [lexer.has("ADD_ASSIGN") ? { type: "ADD_ASSIGN" } : ADD_ASSIGN],
  },
  {
    name: "assignment_operator",
    symbols: [lexer.has("SUB_ASSIGN") ? { type: "SUB_ASSIGN" } : SUB_ASSIGN],
  },
  {
    name: "assignment_operator",
    symbols: [lexer.has("LEFT_ASSIGN") ? { type: "LEFT_ASSIGN" } : LEFT_ASSIGN],
  },
  {
    name: "assignment_operator",
    symbols: [
      lexer.has("RIGHT_ASSIGN") ? { type: "RIGHT_ASSIGN" } : RIGHT_ASSIGN,
    ],
  },
  {
    name: "assignment_operator",
    symbols: [lexer.has("AND_ASSIGN") ? { type: "AND_ASSIGN" } : AND_ASSIGN],
  },
  {
    name: "assignment_operator",
    symbols: [lexer.has("XOR_ASSIGN") ? { type: "XOR_ASSIGN" } : XOR_ASSIGN],
  },
  {
    name: "assignment_operator",
    symbols: [lexer.has("OR_ASSIGN") ? { type: "OR_ASSIGN" } : OR_ASSIGN],
  },
  { name: "expression", symbols: ["assignment_expression"] },
  {
    name: "expression",
    symbols: [
      "expression",
      lexer.has("COMMA") ? { type: "COMMA" } : COMMA,
      "assignment_expression",
    ],
  },
  { name: "constant_expression", symbols: ["conditional_expression"] },
  { name: "declaration_no_semicolon", symbols: ["function_prototype"] },
  { name: "declaration_no_semicolon", symbols: ["init_declarator_list"] },
  {
    name: "declaration_no_semicolon",
    symbols: [
      lexer.has("PRECISION") ? { type: "PRECISION" } : PRECISION,
      "precision_qualifier",
      "type_specifier_no_prec",
    ],
  },
  {
    name:
      "declaration_no_semicolon$ebnf$1$subexpression$1$ebnf$1$subexpression$1",
    symbols: [
      lexer.has("LEFT_BRACKET") ? { type: "LEFT_BRACKET" } : LEFT_BRACKET,
      "constant_expression",
      lexer.has("RIGHT_BRACKET") ? { type: "RIGHT_BRACKET" } : RIGHT_BRACKET,
    ],
  },
  {
    name: "declaration_no_semicolon$ebnf$1$subexpression$1$ebnf$1",
    symbols: [
      "declaration_no_semicolon$ebnf$1$subexpression$1$ebnf$1$subexpression$1",
    ],
    postprocess: id,
  },
  {
    name: "declaration_no_semicolon$ebnf$1$subexpression$1$ebnf$1",
    symbols: [],
    postprocess: () => null,
  },
  {
    name: "declaration_no_semicolon$ebnf$1$subexpression$1",
    symbols: [
      lexer.has("IDENTIFIER") ? { type: "IDENTIFIER" } : IDENTIFIER,
      "declaration_no_semicolon$ebnf$1$subexpression$1$ebnf$1",
    ],
  },
  {
    name: "declaration_no_semicolon$ebnf$1",
    symbols: ["declaration_no_semicolon$ebnf$1$subexpression$1"],
    postprocess: id,
  },
  {
    name: "declaration_no_semicolon$ebnf$1",
    symbols: [],
    postprocess: () => null,
  },
  {
    name: "declaration_no_semicolon",
    symbols: [
      "type_qualifier",
      lexer.has("IDENTIFIER") ? { type: "IDENTIFIER" } : IDENTIFIER,
      lexer.has("LEFT_BRACE") ? { type: "LEFT_BRACE" } : LEFT_BRACE,
      "struct_declaration_list",
      lexer.has("RIGHT_BRACE") ? { type: "RIGHT_BRACE" } : RIGHT_BRACE,
      "declaration_no_semicolon$ebnf$1",
    ],
    postprocess: ([qualifier, identifier, , members, , instance]) =>
      Object.assign(
        new InterfaceBlock(
          identifier,
          members,
          instance && instance[0],
          instance && instance[1] && instance[1][1],
        ),
        qualifier,
      ),
  },
  { name: "declaration_no_semicolon", symbols: ["type_qualifier"] },
  {
    name: "function_prototype",
    symbols: [
      "function_declarator",
      lexer.has("RIGHT_PAREN") ? { type: "RIGHT_PAREN" } : RIGHT_PAREN,
    ],
  },
  { name: "function_declarator", symbols: ["function_header"] },
  { name: "function_declarator", symbols: ["function_header_with_parameters"] },
  {
    name: "function_header_with_parameters",
    symbols: ["function_header", "parameter_declaration"],
  },
  {
    name: "function_header_with_parameters",
    symbols: [
      "function_header_with_parameters",
      lexer.has("COMMA") ? { type: "COMMA" } : COMMA,
      "parameter_declaration",
    ],
  },
  {
    name: "function_header",
    symbols: [
      "fully_specified_type",
      lexer.has("IDENTIFIER") ? { type: "IDENTIFIER" } : IDENTIFIER,
      lexer.has("LEFT_PAREN") ? { type: "LEFT_PAREN" } : LEFT_PAREN,
    ],
  },
  {
    name: "parameter_declarator",
    symbols: [
      "type_specifier",
      lexer.has("IDENTIFIER") ? { type: "IDENTIFIER" } : IDENTIFIER,
    ],
  },
  {
    name: "parameter_declarator",
    symbols: [
      "type_specifier",
      lexer.has("IDENTIFIER") ? { type: "IDENTIFIER" } : IDENTIFIER,
      lexer.has("LEFT_BRACKET") ? { type: "LEFT_BRACKET" } : LEFT_BRACKET,
      "constant_expression",
      lexer.has("RIGHT_BRACKET") ? { type: "RIGHT_BRACKET" } : RIGHT_BRACKET,
    ],
  },
  {
    name: "parameter_declaration",
    symbols: [
      "parameter_type_qualifier",
      "parameter_qualifier",
      "parameter_declarator",
    ],
  },
  {
    name: "parameter_declaration",
    symbols: ["parameter_qualifier", "parameter_declarator"],
  },
  {
    name: "parameter_declaration",
    symbols: [
      "parameter_type_qualifier",
      "parameter_qualifier",
      "parameter_type_specifier",
    ],
  },
  {
    name: "parameter_declaration",
    symbols: ["parameter_qualifier", "parameter_type_specifier"],
  },
  { name: "parameter_qualifier", symbols: [] },
  {
    name: "parameter_qualifier",
    symbols: [lexer.has("IN") ? { type: "IN" } : IN],
  },
  {
    name: "parameter_qualifier",
    symbols: [lexer.has("OUT") ? { type: "OUT" } : OUT],
  },
  {
    name: "parameter_qualifier",
    symbols: [lexer.has("INOUT") ? { type: "INOUT" } : INOUT],
  },
  { name: "parameter_type_specifier", symbols: ["type_specifier"] },
  { name: "init_declarator_list$macrocall$2", symbols: ["declarator"] },
  { name: "init_declarator_list$macrocall$1", symbols: [] },
  { name: "init_declarator_list$macrocall$1$ebnf$1", symbols: [] },
  {
    name: "init_declarator_list$macrocall$1$ebnf$1$subexpression$1",
    symbols: [
      lexer.has("COMMA") ? { type: "COMMA" } : COMMA,
      "init_declarator_list$macrocall$2",
    ],
    postprocess: scd,
  },
  {
    name: "init_declarator_list$macrocall$1$ebnf$1",
    symbols: [
      "init_declarator_list$macrocall$1$ebnf$1",
      "init_declarator_list$macrocall$1$ebnf$1$subexpression$1",
    ],
    postprocess: (d) => d[0].concat([d[1]]),
  },
  {
    name: "init_declarator_list$macrocall$1",
    symbols: [
      "init_declarator_list$macrocall$2",
      "init_declarator_list$macrocall$1$ebnf$1",
    ],
    postprocess: ([head, tail]) => [head].concat(tail),
  },
  {
    name: "init_declarator_list",
    symbols: ["fully_specified_type", "init_declarator_list$macrocall$1"],
    postprocess: ([type, declarations]) =>
      new InitDeclaratorList(type, declarations),
  },
  {
    name: "init_declarator_list",
    symbols: [
      lexer.has("INVARIANT") ? { type: "INVARIANT" } : INVARIANT,
      lexer.has("IDENTIFIER") ? { type: "IDENTIFIER" } : IDENTIFIER,
    ],
  },
  {
    name: "declarator$ebnf$1$subexpression$1$ebnf$1",
    symbols: ["constant_expression"],
    postprocess: id,
  },
  {
    name: "declarator$ebnf$1$subexpression$1$ebnf$1",
    symbols: [],
    postprocess: () => null,
  },
  {
    name: "declarator$ebnf$1$subexpression$1",
    symbols: [
      lexer.has("LEFT_BRACKET") ? { type: "LEFT_BRACKET" } : LEFT_BRACKET,
      "declarator$ebnf$1$subexpression$1$ebnf$1",
      lexer.has("RIGHT_BRACKET") ? { type: "RIGHT_BRACKET" } : RIGHT_BRACKET,
    ],
  },
  {
    name: "declarator$ebnf$1",
    symbols: ["declarator$ebnf$1$subexpression$1"],
    postprocess: id,
  },
  { name: "declarator$ebnf$1", symbols: [], postprocess: () => null },
  {
    name: "declarator$ebnf$2$subexpression$1",
    symbols: [lexer.has("EQUAL") ? { type: "EQUAL" } : EQUAL, "initializer"],
    postprocess: scd,
  },
  {
    name: "declarator$ebnf$2",
    symbols: ["declarator$ebnf$2$subexpression$1"],
    postprocess: id,
  },
  { name: "declarator$ebnf$2", symbols: [], postprocess: () => null },
  {
    name: "declarator",
    symbols: [
      lexer.has("IDENTIFIER") ? { type: "IDENTIFIER" } : IDENTIFIER,
      "declarator$ebnf$1",
      "declarator$ebnf$2",
    ],
    postprocess: ([name, array, initializer]) =>
      new DeclaratorListDeclarator(
        name,
        !!array,
        array && array[1],
        initializer,
      ),
  },
  {
    name: "fully_specified_type",
    symbols: ["type_qualifier", "type_specifier"],
    postprocess: ([qualifier, type]) => Object.assign(type, qualifier),
  },
  {
    name: "invariant_qualifier",
    symbols: [lexer.has("INVARIANT") ? { type: "INVARIANT" } : INVARIANT],
  },
  {
    name: "interpolation_qualifier",
    symbols: [lexer.has("SMOOTH") ? { type: "SMOOTH" } : SMOOTH],
  },
  {
    name: "interpolation_qualifier",
    symbols: [lexer.has("FLAT") ? { type: "FLAT" } : FLAT],
  },
  {
    name: "layout_qualifier",
    symbols: [
      lexer.has("LAYOUT") ? { type: "LAYOUT" } : LAYOUT,
      lexer.has("LEFT_PAREN") ? { type: "LEFT_PAREN" } : LEFT_PAREN,
      "layout_qualifier_id_list",
      lexer.has("RIGHT_PAREN") ? { type: "RIGHT_PAREN" } : RIGHT_PAREN,
    ],
  },
  { name: "layout_qualifier_id_list", symbols: ["layout_qualifier_id"] },
  {
    name: "layout_qualifier_id_list",
    symbols: [
      "layout_qualifier_id_list",
      lexer.has("COMMA") ? { type: "COMMA" } : COMMA,
      "layout_qualifier_id",
    ],
  },
  {
    name: "layout_qualifier_id",
    symbols: [lexer.has("IDENTIFIER") ? { type: "IDENTIFIER" } : IDENTIFIER],
  },
  {
    name: "layout_qualifier_id",
    symbols: [
      lexer.has("IDENTIFIER") ? { type: "IDENTIFIER" } : IDENTIFIER,
      lexer.has("EQUAL") ? { type: "EQUAL" } : EQUAL,
      lexer.has("INTCONSTANT") ? { type: "INTCONSTANT" } : INTCONSTANT,
    ],
  },
  {
    name: "layout_qualifier_id",
    symbols: [
      lexer.has("IDENTIFIER") ? { type: "IDENTIFIER" } : IDENTIFIER,
      lexer.has("EQUAL") ? { type: "EQUAL" } : EQUAL,
      lexer.has("UINTCONSTANT") ? { type: "UINTCONSTANT" } : UINTCONSTANT,
    ],
  },
  {
    name: "parameter_type_qualifier",
    symbols: [lexer.has("CONST") ? { type: "CONST" } : CONST],
  },
  {
    name: "type_qualifier$ebnf$1",
    symbols: ["invariant_qualifier"],
    postprocess: id,
  },
  { name: "type_qualifier$ebnf$1", symbols: [], postprocess: () => null },
  {
    name: "type_qualifier$ebnf$2",
    symbols: ["interpolation_qualifier"],
    postprocess: id,
  },
  { name: "type_qualifier$ebnf$2", symbols: [], postprocess: () => null },
  {
    name: "type_qualifier$ebnf$3",
    symbols: ["storage_qualifier"],
    postprocess: id,
  },
  { name: "type_qualifier$ebnf$3", symbols: [], postprocess: () => null },
  {
    name: "type_qualifier",
    symbols: [
      "type_qualifier$ebnf$1",
      "type_qualifier$ebnf$2",
      "type_qualifier$ebnf$3",
    ],
    postprocess: ([invariant, interpolation, storage]) => ({
      invariant,
      interpolation,
      storage: storage && (storage[1] || storage),
      centroid: storage && storage[0],
    }),
  },
  {
    name: "type_qualifier$ebnf$4",
    symbols: ["storage_qualifier"],
    postprocess: id,
  },
  { name: "type_qualifier$ebnf$4", symbols: [], postprocess: () => null },
  {
    name: "type_qualifier",
    symbols: ["layout_qualifier", "type_qualifier$ebnf$4"],
    postprocess: ([layout, storage]) => ({
      layout,
      storage: storage && (storage[1] || storage),
      centroid: storage && storage[0],
    }),
  },
  {
    name: "storage_qualifier",
    symbols: [lexer.has("CONST") ? { type: "CONST" } : CONST],
  },
  {
    name: "storage_qualifier",
    symbols: [lexer.has("IN") ? { type: "IN" } : IN],
  },
  {
    name: "storage_qualifier",
    symbols: [lexer.has("OUT") ? { type: "OUT" } : OUT],
  },
  {
    name: "storage_qualifier",
    symbols: [
      lexer.has("CENTROID") ? { type: "CENTROID" } : CENTROID,
      lexer.has("IN") ? { type: "IN" } : IN,
    ],
  },
  {
    name: "storage_qualifier",
    symbols: [
      lexer.has("CENTROID") ? { type: "CENTROID" } : CENTROID,
      lexer.has("OUT") ? { type: "OUT" } : OUT,
    ],
  },
  {
    name: "storage_qualifier",
    symbols: [lexer.has("UNIFORM") ? { type: "UNIFORM" } : UNIFORM],
  },
  {
    name: "storage_qualifier",
    symbols: [lexer.has("VARYING") ? { type: "VARYING" } : VARYING],
  },
  {
    name: "storage_qualifier",
    symbols: [lexer.has("ATTRIBUTE") ? { type: "ATTRIBUTE" } : ATTRIBUTE],
  },
  { name: "type_specifier", symbols: ["type_specifier_no_prec"] },
  {
    name: "type_specifier",
    symbols: ["precision_qualifier", "type_specifier_no_prec"],
  },
  { name: "type_specifier_no_prec", symbols: ["type_specifier_nonarray"] },
  {
    name: "type_specifier_no_prec",
    symbols: [
      "type_specifier_nonarray",
      lexer.has("LEFT_BRACKET") ? { type: "LEFT_BRACKET" } : LEFT_BRACKET,
      lexer.has("RIGHT_BRACKET") ? { type: "RIGHT_BRACKET" } : RIGHT_BRACKET,
    ],
  },
  {
    name: "type_specifier_no_prec",
    symbols: [
      "type_specifier_nonarray",
      lexer.has("LEFT_BRACKET") ? { type: "LEFT_BRACKET" } : LEFT_BRACKET,
      "constant_expression",
      lexer.has("RIGHT_BRACKET") ? { type: "RIGHT_BRACKET" } : RIGHT_BRACKET,
    ],
  },
  {
    name: "type_specifier_nonarray",
    symbols: [lexer.has("VOID") ? { type: "VOID" } : VOID],
  },
  {
    name: "type_specifier_nonarray",
    symbols: [lexer.has("TYPE") ? { type: "TYPE" } : TYPE],
  },
  { name: "type_specifier_nonarray", symbols: ["struct_specifier"] },
  {
    name: "type_specifier_nonarray",
    symbols: [lexer.has("IDENTIFIER") ? { type: "IDENTIFIER" } : IDENTIFIER],
  },
  {
    name: "precision_qualifier",
    symbols: [
      lexer.has("HIGH_PRECISION") ? { type: "HIGH_PRECISION" } : HIGH_PRECISION,
    ],
  },
  {
    name: "precision_qualifier",
    symbols: [
      lexer.has("MEDIUM_PRECISION")
        ? { type: "MEDIUM_PRECISION" }
        : MEDIUM_PRECISION,
    ],
  },
  {
    name: "precision_qualifier",
    symbols: [
      lexer.has("LOW_PRECISION") ? { type: "LOW_PRECISION" } : LOW_PRECISION,
    ],
  },
  {
    name: "struct_specifier$ebnf$1",
    symbols: [lexer.has("IDENTIFIER") ? { type: "IDENTIFIER" } : IDENTIFIER],
    postprocess: id,
  },
  { name: "struct_specifier$ebnf$1", symbols: [], postprocess: () => null },
  {
    name: "struct_specifier",
    symbols: [
      lexer.has("STRUCT") ? { type: "STRUCT" } : STRUCT,
      "struct_specifier$ebnf$1",
      lexer.has("LEFT_BRACE") ? { type: "LEFT_BRACE" } : LEFT_BRACE,
      "struct_declaration_list",
      lexer.has("RIGHT_BRACE") ? { type: "RIGHT_BRACE" } : RIGHT_BRACE,
    ],
    postprocess: ([, identifier, , declarations]) => {
      const result = new StructDeclaration(identifier, declarations)
      return result
    },
  },
  { name: "struct_declaration_list$ebnf$1", symbols: [] },
  {
    name: "struct_declaration_list$ebnf$1$subexpression$1",
    symbols: [
      "init_declarator_list",
      lexer.has("SEMICOLON") ? { type: "SEMICOLON" } : SEMICOLON,
    ],
    postprocess: id,
  },
  {
    name: "struct_declaration_list$ebnf$1",
    symbols: [
      "struct_declaration_list$ebnf$1",
      "struct_declaration_list$ebnf$1$subexpression$1",
    ],
    postprocess: (d) => d[0].concat([d[1]]),
  },
  {
    name: "struct_declaration_list",
    symbols: ["struct_declaration_list$ebnf$1"],
  },
  { name: "initializer", symbols: ["assignment_expression"] },
  {
    name: "declaration_statement",
    symbols: [
      "declaration_no_semicolon",
      lexer.has("SEMICOLON") ? { type: "SEMICOLON" } : SEMICOLON,
    ],
  },
  { name: "statement", symbols: ["compound_statement_with_scope"] },
  { name: "statement", symbols: ["simple_statement"] },
  {
    name: "statement_no_new_scope",
    symbols: ["compound_statement_no_new_scope"],
  },
  { name: "statement_no_new_scope", symbols: ["simple_statement"] },
  {
    name: "statement_with_scope",
    symbols: ["compound_statement_no_new_scope"],
  },
  { name: "statement_with_scope", symbols: ["simple_statement"] },
  { name: "simple_statement", symbols: ["declaration_statement"] },
  { name: "simple_statement", symbols: ["expression_statement"] },
  { name: "simple_statement", symbols: ["selection_statement"] },
  { name: "simple_statement", symbols: ["switch_statement"] },
  { name: "simple_statement", symbols: ["case_label"] },
  { name: "simple_statement", symbols: ["iteration_statement"] },
  { name: "simple_statement", symbols: ["jump_statement"] },
  {
    name: "compound_statement_with_scope",
    symbols: [
      lexer.has("LEFT_BRACE") ? { type: "LEFT_BRACE" } : LEFT_BRACE,
      lexer.has("RIGHT_BRACE") ? { type: "RIGHT_BRACE" } : RIGHT_BRACE,
    ],
  },
  {
    name: "compound_statement_with_scope",
    symbols: [
      lexer.has("LEFT_BRACE") ? { type: "LEFT_BRACE" } : LEFT_BRACE,
      "statement_list",
      lexer.has("RIGHT_BRACE") ? { type: "RIGHT_BRACE" } : RIGHT_BRACE,
    ],
  },
  {
    name: "compound_statement_no_new_scope",
    symbols: [
      lexer.has("LEFT_BRACE") ? { type: "LEFT_BRACE" } : LEFT_BRACE,
      lexer.has("RIGHT_BRACE") ? { type: "RIGHT_BRACE" } : RIGHT_BRACE,
    ],
  },
  {
    name: "compound_statement_no_new_scope",
    symbols: [
      lexer.has("LEFT_BRACE") ? { type: "LEFT_BRACE" } : LEFT_BRACE,
      "statement_list",
      lexer.has("RIGHT_BRACE") ? { type: "RIGHT_BRACE" } : RIGHT_BRACE,
    ],
  },
  { name: "statement_list", symbols: ["statement"] },
  { name: "statement_list", symbols: ["statement_list", "statement"] },
  {
    name: "expression_statement",
    symbols: [lexer.has("SEMICOLON") ? { type: "SEMICOLON" } : SEMICOLON],
  },
  {
    name: "expression_statement",
    symbols: [
      "expression",
      lexer.has("SEMICOLON") ? { type: "SEMICOLON" } : SEMICOLON,
    ],
  },
  {
    name: "selection_statement",
    symbols: [
      lexer.has("IF") ? { type: "IF" } : IF,
      lexer.has("LEFT_PAREN") ? { type: "LEFT_PAREN" } : LEFT_PAREN,
      "expression",
      lexer.has("RIGHT_PAREN") ? { type: "RIGHT_PAREN" } : RIGHT_PAREN,
      "selection_rest_statement",
    ],
  },
  {
    name: "selection_rest_statement",
    symbols: [
      "statement_with_scope",
      lexer.has("ELSE") ? { type: "ELSE" } : ELSE,
      "statement_with_scope",
    ],
  },
  { name: "selection_rest_statement", symbols: ["statement_with_scope"] },
  { name: "condition", symbols: ["expression"] },
  {
    name: "condition",
    symbols: [
      "fully_specified_type",
      lexer.has("IDENTIFIER") ? { type: "IDENTIFIER" } : IDENTIFIER,
      lexer.has("EQUAL") ? { type: "EQUAL" } : EQUAL,
      "initializer",
    ],
  },
  {
    name: "switch_statement",
    symbols: [
      lexer.has("SWITCH") ? { type: "SWITCH" } : SWITCH,
      lexer.has("LEFT_PAREN") ? { type: "LEFT_PAREN" } : LEFT_PAREN,
      "expression",
      lexer.has("RIGHT_PAREN") ? { type: "RIGHT_PAREN" } : RIGHT_PAREN,
      lexer.has("LEFT_BRACE") ? { type: "LEFT_BRACE" } : LEFT_BRACE,
      "switch_statement_list",
      lexer.has("RIGHT_BRACE") ? { type: "RIGHT_BRACE" } : RIGHT_BRACE,
    ],
  },
  { name: "switch_statement_list", symbols: [] },
  { name: "switch_statement_list", symbols: ["statement_list"] },
  {
    name: "case_label",
    symbols: [
      lexer.has("CASE") ? { type: "CASE" } : CASE,
      "expression",
      lexer.has("COLON") ? { type: "COLON" } : COLON,
    ],
  },
  {
    name: "case_label",
    symbols: [
      lexer.has("DEFAULT") ? { type: "DEFAULT" } : DEFAULT,
      lexer.has("COLON") ? { type: "COLON" } : COLON,
    ],
  },
  {
    name: "iteration_statement",
    symbols: [
      lexer.has("WHILE") ? { type: "WHILE" } : WHILE,
      lexer.has("LEFT_PAREN") ? { type: "LEFT_PAREN" } : LEFT_PAREN,
      "condition",
      lexer.has("RIGHT_PAREN") ? { type: "RIGHT_PAREN" } : RIGHT_PAREN,
      "statement_no_new_scope",
    ],
  },
  {
    name: "iteration_statement",
    symbols: [
      lexer.has("DO") ? { type: "DO" } : DO,
      "statement_with_scope",
      lexer.has("WHILE") ? { type: "WHILE" } : WHILE,
      lexer.has("LEFT_PAREN") ? { type: "LEFT_PAREN" } : LEFT_PAREN,
      "expression",
      lexer.has("RIGHT_PAREN") ? { type: "RIGHT_PAREN" } : RIGHT_PAREN,
      lexer.has("SEMICOLON") ? { type: "SEMICOLON" } : SEMICOLON,
    ],
  },
  {
    name: "iteration_statement",
    symbols: [
      lexer.has("FOR") ? { type: "FOR" } : FOR,
      lexer.has("LEFT_PAREN") ? { type: "LEFT_PAREN" } : LEFT_PAREN,
      "for_init_statement",
      "for_rest_statement",
      lexer.has("RIGHT_PAREN") ? { type: "RIGHT_PAREN" } : RIGHT_PAREN,
      "statement_no_new_scope",
    ],
  },
  { name: "for_init_statement", symbols: ["expression_statement"] },
  { name: "for_init_statement", symbols: ["declaration_statement"] },
  { name: "conditionopt", symbols: ["condition"] },
  { name: "conditionopt", symbols: [] },
  {
    name: "for_rest_statement",
    symbols: [
      "conditionopt",
      lexer.has("SEMICOLON") ? { type: "SEMICOLON" } : SEMICOLON,
    ],
  },
  {
    name: "for_rest_statement",
    symbols: [
      "conditionopt",
      lexer.has("SEMICOLON") ? { type: "SEMICOLON" } : SEMICOLON,
      "expression",
    ],
  },
  {
    name: "jump_statement",
    symbols: [
      lexer.has("CONTINUE") ? { type: "CONTINUE" } : CONTINUE,
      lexer.has("SEMICOLON") ? { type: "SEMICOLON" } : SEMICOLON,
    ],
  },
  {
    name: "jump_statement",
    symbols: [
      lexer.has("BREAK") ? { type: "BREAK" } : BREAK,
      lexer.has("SEMICOLON") ? { type: "SEMICOLON" } : SEMICOLON,
    ],
  },
  {
    name: "jump_statement",
    symbols: [
      lexer.has("RETURN") ? { type: "RETURN" } : RETURN,
      lexer.has("SEMICOLON") ? { type: "SEMICOLON" } : SEMICOLON,
    ],
  },
  {
    name: "jump_statement",
    symbols: [
      lexer.has("RETURN") ? { type: "RETURN" } : RETURN,
      "expression",
      lexer.has("SEMICOLON") ? { type: "SEMICOLON" } : SEMICOLON,
    ],
  },
  {
    name: "jump_statement",
    symbols: [
      lexer.has("DISCARD") ? { type: "DISCARD" } : DISCARD,
      lexer.has("SEMICOLON") ? { type: "SEMICOLON" } : SEMICOLON,
    ],
  },
  { name: "external_declaration", symbols: ["function_definition"] },
  {
    name: "external_declaration",
    symbols: [
      "declaration_no_semicolon",
      lexer.has("SEMICOLON") ? { type: "SEMICOLON" } : SEMICOLON,
    ],
    postprocess: id,
  },
  {
    name: "function_definition",
    symbols: ["function_prototype", "compound_statement_no_new_scope"],
  },
]

export var ParserStart: string = "translation_unit"
