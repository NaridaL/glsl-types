@{%
import { makeLexer } from "./preprocessor"
const lexer = makeLexer()
function scd(x: any[]) { return x[1] }
import { DeclaratorListDeclarator,
	InitDeclaratorList,
	StructDeclaration,
	InterfaceBlock } from "./AST"
export interface State { wroteGLPosition?: boolean }
let state: State = undefined!
export function setState(s: State) { state = s }
%}

# Pass your lexer object using the @lexer option:
@lexer lexer
@preprocessor typescript

#REPEAT0[X] -> $X:*
translation_unit ->
	%VERSION:? external_declaration:* {% scd %}
variable_identifier ->
	%IDENTIFIER
primary_expression ->
	variable_identifier
	| %INTCONSTANT
	| %UINTCONSTANT
	| %FLOATCONSTANT
	| %BOOLCONSTANT
	| %LEFT_PAREN expression %RIGHT_PAREN
postfix_expression ->
	primary_expression
	| postfix_expression %LEFT_BRACKET integer_expression %RIGHT_BRACKET
	| function_call
	| postfix_expression %DOT %IDENTIFIER # %FIELD_SELECTION
	| postfix_expression %INC_OP
	| postfix_expression %DEC_OP
integer_expression ->
	expression
function_call ->
	function_call_or_method
function_call_or_method ->
	function_call_generic
	| postfix_expression %DOT function_call_generic
function_call_generic ->
	function_call_header_with_parameters %RIGHT_PAREN
	| function_call_header_no_parameters %RIGHT_PAREN
function_call_header_no_parameters ->
	function_call_header %VOID
	| function_call_header
function_call_header_with_parameters ->
	function_call_header assignment_expression
	| function_call_header_with_parameters %COMMA assignment_expression
function_call_header ->
	function_identifier %LEFT_PAREN
# Grammar Note ->	 Constructors look like functions, but lexical
# analysis recognized most of them as
# keywords.  They are now recognized through “type_specifier”.
# Methods (.length) and identifiers are recognized through postfix_expression.
function_identifier ->
	type_specifier
#	| %IDENTIFIER
#	| %FIELD_SELECTION
unary_expression ->
	postfix_expression
	| %INC_OP unary_expression
	| %DEC_OP unary_expression
	| unary_operator unary_expression
# Grammar Note ->	  No traditional style type casts.
unary_operator ->
	%PLUS
	| %DASH
	| %BANG
	| %TILDE
# Grammar Note ->	  No '*' or '&' unary ops.  Pointers are not supported.
multiplicative_expression ->
	unary_expression
	| multiplicative_expression %STAR unary_expression
	| multiplicative_expression %SLASH unary_expression
	| multiplicative_expression %PERCENT unary_expression
additive_expression ->
	multiplicative_expression
	| additive_expression %PLUS multiplicative_expression
	| additive_expression %DASH multiplicative_expression
shift_expression ->
	additive_expression
	| shift_expression %LEFT_OP additive_expression
	| shift_expression %RIGHT_OP additive_expression
relational_expression ->
	shift_expression
	| relational_expression %LEFT_ANGLE shift_expression
	| relational_expression %RIGHT_ANGLE shift_expression
	| relational_expression %LE_OP shift_expression
	| relational_expression %GE_OP shift_expression
equality_expression ->
	relational_expression
	| equality_expression %EQ_OP relational_expression
	| equality_expression %NE_OP relational_expression
and_expression ->
	equality_expression
	| and_expression %AMPERSAND equality_expression
exclusive_or_expression ->
	and_expression
	| exclusive_or_expression %CARET and_expression
inclusive_or_expression ->
	exclusive_or_expression
	| inclusive_or_expression %VERTICAL_BAR exclusive_or_expression
logical_and_expression ->
	inclusive_or_expression
	| logical_and_expression %AND_OP inclusive_or_expression
logical_xor_expression ->
	logical_and_expression
	| logical_xor_expression %XOR_OP logical_and_expression
logical_or_expression ->
	logical_xor_expression
	| logical_or_expression %OR_OP logical_xor_expression
conditional_expression ->
	logical_or_expression
	| logical_or_expression %QUESTION expression %COLON assignment_expression
assignment_expression ->
	conditional_expression
	| unary_expression assignment_operator assignment_expression {% ([left, op, right]) => {
		if (op.type == 'EQUAL' && left && left.type == 'IDENTIFIER' && left.value == 'gl_Position') {
			state.wroteGLPosition = true
		}
	} %}
assignment_operator ->
	%EQUAL
	| %MUL_ASSIGN
	| %DIV_ASSIGN
	| %MOD_ASSIGN
	| %ADD_ASSIGN
	| %SUB_ASSIGN
	| %LEFT_ASSIGN
	| %RIGHT_ASSIGN
	| %AND_ASSIGN
	| %XOR_ASSIGN
	| %OR_ASSIGN
expression ->
	assignment_expression
	| expression %COMMA assignment_expression
constant_expression ->
	conditional_expression
declaration_no_semicolon ->
	function_prototype
	| init_declarator_list
	| %PRECISION precision_qualifier type_specifier_no_prec
	# interface block:
	| type_qualifier %IDENTIFIER %LEFT_BRACE struct_declaration_list %RIGHT_BRACE (%IDENTIFIER (%LEFT_BRACKET constant_expression %RIGHT_BRACKET):?):?
	{% ([qualifier, identifier, , members, , instance]) => Object.assign(new InterfaceBlock(identifier, members, instance && instance[0], instance && instance[1] && instance[1][1]), qualifier) %}
#	| type_qualifier %IDENTIFIER %LEFT_BRACE struct_declaration_list %RIGHT_BRACE %IDENTIFIER
#	| type_qualifier %IDENTIFIER %LEFT_BRACE struct_declaration_list %RIGHT_BRACE %IDENTIFIER %LEFT_BRACKET constant_expression %RIGHT_BRACKET
	| type_qualifier
function_prototype ->
	function_declarator %RIGHT_PAREN
function_declarator ->
	function_header
	| function_header_with_parameters
function_header_with_parameters ->
	function_header parameter_declaration
	| function_header_with_parameters %COMMA parameter_declaration
function_header ->
	fully_specified_type %IDENTIFIER %LEFT_PAREN
parameter_declarator ->
	type_specifier %IDENTIFIER
	| type_specifier %IDENTIFIER %LEFT_BRACKET constant_expression %RIGHT_BRACKET
parameter_declaration ->
	parameter_type_qualifier parameter_qualifier parameter_declarator
	| parameter_qualifier parameter_declarator
	| parameter_type_qualifier parameter_qualifier parameter_type_specifier
	| parameter_qualifier parameter_type_specifier
parameter_qualifier ->
	null
	| %IN
	| %OUT
	| %INOUT
parameter_type_specifier ->
	type_specifier
# init_declarator_list ->
# 	single_declaration
# 	| init_declarator_list %COMMA %IDENTIFIER
# 	| init_declarator_list %COMMA %IDENTIFIER %LEFT_BRACKET constant_expression %RIGHT_BRACKET
# 	| init_declarator_list %COMMA %IDENTIFIER %LEFT_BRACKET %RIGHT_BRACKET %EQUAL initializer
# 	| init_declarator_list %COMMA %IDENTIFIER %LEFT_BRACKET constant_expression %RIGHT_BRACKET %EQUAL initializer
# 	| init_declarator_list %COMMA %IDENTIFIER %EQUAL initializer
# single_declaration ->
# 	fully_specified_type
# 	| fully_specified_type %IDENTIFIER
# 	| fully_specified_type %IDENTIFIER %LEFT_BRACKET constant_expression %RIGHT_BRACKET
# 	| fully_specified_type %IDENTIFIER %LEFT_BRACKET %RIGHT_BRACKET %EQUAL initializer
# 	| fully_specified_type %IDENTIFIER %LEFT_BRACKET constant_expression %RIGHT_BRACKET %EQUAL initializer
# 	| fully_specified_type %IDENTIFIER %EQUAL initializer
# 	| %INVARIANT %IDENTIFIER
CommaSeparatedList[X] ->
	  null
	| $X (%COMMA $X {% scd %}):* {% ([head, tail]) => [head].concat(tail) %}
init_declarator_list ->
	  fully_specified_type CommaSeparatedList[declarator] {% ([type, declarations]) => new InitDeclaratorList(type, declarations) %}
	| %INVARIANT %IDENTIFIER
declarator ->
	%IDENTIFIER (%LEFT_BRACKET constant_expression:? %RIGHT_BRACKET):? (%EQUAL initializer {% scd %}):?
		{% ([name, array, initializer]) => new DeclaratorListDeclarator(name, !!array, array && array[1], initializer) %}
# Grammar Note ->	  No 'enum', or 'typedef'.
# fully_specified_type ->
# 	type_specifier
# 	| type_qualifier type_specifier
fully_specified_type ->
	type_qualifier type_specifier {% ([qualifier, type]) => Object.assign(type, qualifier) %}

invariant_qualifier ->
	%INVARIANT
interpolation_qualifier ->
	%SMOOTH
	| %FLAT
layout_qualifier ->
	%LAYOUT %LEFT_PAREN layout_qualifier_id_list %RIGHT_PAREN
layout_qualifier_id_list ->
	layout_qualifier_id
	| layout_qualifier_id_list %COMMA layout_qualifier_id
layout_qualifier_id ->
	%IDENTIFIER
	| %IDENTIFIER %EQUAL %INTCONSTANT
	| %IDENTIFIER %EQUAL %UINTCONSTANT
parameter_type_qualifier ->
	%CONST
# type_qualifier ->
# 	storage_qualifier
# 	| layout_qualifier
# 	| layout_qualifier storage_qualifier
# 	| interpolation_qualifier storage_qualifier
# 	| interpolation_qualifier
# 	| invariant_qualifier storage_qualifier
# 	| invariant_qualifier interpolation_qualifier storage_qualifier
type_qualifier ->
	  invariant_qualifier:? interpolation_qualifier:? storage_qualifier:? {% ([invariant, interpolation, storage]) => ({invariant, interpolation, storage: storage && (storage[1] || storage), centroid: storage && storage[0]}) %}
	| layout_qualifier storage_qualifier:? {% ([layout, storage]) => ({layout, storage: storage && (storage[1] || storage), centroid: storage && storage[0]}) %}
storage_qualifier ->
	%CONST
	| %IN
	| %OUT
	| %CENTROID %IN
	| %CENTROID %OUT
	| %UNIFORM
	| %VARYING
	| %ATTRIBUTE
type_specifier ->
	type_specifier_no_prec
	| precision_qualifier type_specifier_no_prec
type_specifier_no_prec ->
	type_specifier_nonarray
	| type_specifier_nonarray %LEFT_BRACKET %RIGHT_BRACKET
	| type_specifier_nonarray %LEFT_BRACKET constant_expression %RIGHT_BRACKET
type_specifier_nonarray ->
 	%VOID
# 	| %FLOAT
# 	| %INT
# 	| %UINT
# 	| %BOOL
# 	| %VEC2
# 	| %VEC3
# 	| %VEC4
# 	| %BVEC2
# 	| %BVEC3
# 	| %BVEC4
# 	| %IVEC2
# 	| %IVEC3
# 	| %IVEC4
# 	| %UVEC2
# 	| %UVEC3
# 	| %UVEC4
# 	| %MAT2
# 	| %MAT3
# 	| %MAT4
# 	| %MAT2X2
# 	| %MAT2X3
# 	| %MAT2X4
# 	| %MAT3X2
# 	| %MAT3X3
# 	| %MAT3X4
# 	| %MAT4X2
# 	| %MAT4X3
# 	| %MAT4X4
# 	| %SAMPLER2D
# 	| %SAMPLER3D
# 	| %SAMPLERCUBE
# 	| %SAMPLER2DSHADOW
# 	| %SAMPLERCUBESHADOW
# 	| %SAMPLER2DARRAY
# 	| %SAMPLER2DARRAYSHADOW
# 	| %ISAMPLER2D
# 	| %ISAMPLER3D
# 	| %ISAMPLERCUBE
# 	| %ISAMPLER2DARRAY
# 	| %USAMPLER2D
# 	| %USAMPLER3D
# 	| %USAMPLERCUBE
# 	| %USAMPLER2DARRAY
	| %TYPE
	| struct_specifier
	| %IDENTIFIER # %TYPE_NAME
precision_qualifier ->
	%HIGH_PRECISION
	| %MEDIUM_PRECISION
	| %LOW_PRECISION
# struct_specifier ->
# 	%STRUCT %IDENTIFIER %LEFT_BRACE struct_declaration_list %RIGHT_BRACE
# 	| %STRUCT %LEFT_BRACE struct_declaration_list %RIGHT_BRACE
# struct_declaration_list ->
# 	struct_declaration
# 	| struct_declaration_list struct_declaration
# struct_declaration ->
# 	type_specifier struct_declarator_list %SEMICOLON
# 	| type_qualifier type_specifier struct_declarator_list %SEMICOLON
# struct_declarator_list ->
# 	struct_declarator
# 	| struct_declarator_list %COMMA struct_declarator
# struct_declarator ->
# 	%IDENTIFIER
# 	| %IDENTIFIER %LEFT_BRACKET %RIGHT_BRACKET
# 	| %IDENTIFIER %LEFT_BRACKET constant_expression %RIGHT_BRACKET
struct_specifier ->
	%STRUCT %IDENTIFIER:? %LEFT_BRACE struct_declaration_list %RIGHT_BRACE
	{% ([, identifier, , declarations, ]) => {
			const result = new StructDeclaration(identifier, declarations)
			return result
		} %}
struct_declaration_list ->
	(init_declarator_list %SEMICOLON {% id %}):*
initializer ->
	assignment_expression
declaration_statement ->
	declaration_no_semicolon %SEMICOLON
statement ->
	compound_statement_with_scope
	| simple_statement
statement_no_new_scope ->
	compound_statement_no_new_scope
	| simple_statement
statement_with_scope ->
	compound_statement_no_new_scope
	| simple_statement


# Grammar Note ->	  labeled statements for %SWITCH only; 'goto' is not supported.
simple_statement ->
	declaration_statement
	| expression_statement
	| selection_statement
	| switch_statement
	| case_label
	| iteration_statement
	| jump_statement
compound_statement_with_scope ->
	%LEFT_BRACE %RIGHT_BRACE
	| %LEFT_BRACE statement_list %RIGHT_BRACE
compound_statement_no_new_scope ->
	%LEFT_BRACE %RIGHT_BRACE
	| %LEFT_BRACE statement_list %RIGHT_BRACE
statement_list ->
	statement
	| statement_list statement
expression_statement ->
	%SEMICOLON
	| expression %SEMICOLON
selection_statement ->
	%IF %LEFT_PAREN expression %RIGHT_PAREN selection_rest_statement
selection_rest_statement ->
	statement_with_scope %ELSE statement_with_scope
	| statement_with_scope
condition ->
	expression
	| fully_specified_type %IDENTIFIER %EQUAL initializer
switch_statement ->
	%SWITCH %LEFT_PAREN expression %RIGHT_PAREN %LEFT_BRACE switch_statement_list %RIGHT_BRACE
switch_statement_list ->
	null
	| statement_list
case_label ->
	%CASE expression %COLON
	| %DEFAULT %COLON
iteration_statement ->
	%WHILE %LEFT_PAREN condition %RIGHT_PAREN statement_no_new_scope
	| %DO statement_with_scope %WHILE %LEFT_PAREN expression %RIGHT_PAREN %SEMICOLON
	| %FOR %LEFT_PAREN for_init_statement for_rest_statement %RIGHT_PAREN statement_no_new_scope
for_init_statement ->
	expression_statement
	| declaration_statement
conditionopt ->
	condition
	| null
for_rest_statement ->
	conditionopt %SEMICOLON
	| conditionopt %SEMICOLON expression
jump_statement ->
	%CONTINUE %SEMICOLON
	| %BREAK %SEMICOLON
	| %RETURN %SEMICOLON
	| %RETURN expression %SEMICOLON
	| %DISCARD %SEMICOLON   # Fragment shader only.
# Grammar Note ->	  No 'goto'.  Gotos are not supported.
external_declaration ->
	  function_definition
	| declaration_no_semicolon %SEMICOLON {% id %}
function_definition ->
	function_prototype compound_statement_no_new_scope