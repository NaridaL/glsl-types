
assignment_expression
	= conditional_expression
	/ unary_expression assignment_operator assignment_expression
assignment_operator
	= EQUAL
	/ MUL_ASSIGN
	/ DIV_ASSIGN
	/ MOD_ASSIGN
	/ ADD_ASSIGN
	/ SUB_ASSIGN
	/ LEFT_ASSIGN
	/ RIGHT_ASSIGN
	/ AND_ASSIGN
	/ XOR_ASSIGN
	/ OR_ASSIGN
expression
	= assignment_expression
	/ expression COMMA assignment_expression
constant_expression
	= conditional_expression
declaration
	= function_prototype SEMICOLON
	/ init_declarator_list SEMICOLON
	/ PRECISION precision_qualifier type_specifier_no_prec SEMICOLON
	/ type_qualifier IDENTIFIER LEFT_BRACE struct_declaration_list RIGHT_BRACE SEMICOLON
	/ type_qualifier IDENTIFIER LEFT_BRACE struct_declaration_list RIGHT_BRACE IDENTIFIER SEMICOLON
	/ type_qualifier IDENTIFIER LEFT_BRACE struct_declaration_list RIGHT_BRACE IDENTIFIER LEFT_BRACKET constant_expression RIGHT_BRACKET SEMICOLON
	/ type_qualifier SEMICOLON
function_prototype
	= function_declarator RIGHT_PAREN
function_declarator:


	/ function_header
	/ function_header_with_parameters
function_header_with_parameters
	= function_header parameter_declaration
	/ function_header_with_parameters COMMA parameter_declaration
function_header
	= fully_specified_type IDENTIFIER LEFT_PAREN
parameter_declarator
	= type_specifier IDENTIFIER
	/ type_specifier IDENTIFIER LEFT_BRACKET constant_expression RIGHT_BRACKET
parameter_declaration
	= parameter_type_qualifier parameter_qualifier parameter_declarator
	/ parameter_qualifier parameter_declarator
	/ parameter_type_qualifier parameter_qualifier parameter_type_specifier
	/ parameter_qualifier parameter_type_specifier
parameter_qualifier:
	/* empty */
	/ IN
	/ OUT
	/ INOUT
parameter_type_specifier
	= type_specifier
init_declarator_list
	= single_declaration
	/ init_declarator_list COMMA IDENTIFIER
	/ init_declarator_list COMMA IDENTIFIER LEFT_BRACKET constant_expression
												      RIGHT_BRACKET
	/ init_declarator_list COMMA IDENTIFIER LEFT_BRACKET
												     RIGHT_BRACKET EQUAL initializer
	/ init_declarator_list COMMA IDENTIFIER LEFT_BRACKET constant_expression
												     RIGHT_BRACKET EQUAL initializer
	/ init_declarator_list COMMA IDENTIFIER EQUAL initializer


single_declaration
	= fully_specified_type
	/ fully_specified_type IDENTIFIER
	/ fully_specified_type IDENTIFIER LEFT_BRACKET constant_expression RIGHT_BRACKET
	/ fully_specified_type IDENTIFIER LEFT_BRACKET RIGHT_BRACKET EQUAL initializer
	/ fully_specified_type IDENTIFIER LEFT_BRACKET constant_expression
												      RIGHT_BRACKET EQUAL initializer
	/ fully_specified_type IDENTIFIER EQUAL initializer
	/ INVARIANT IDENTIFIER
// Grammar Note:  No 'enum', or 'typedef'.
fully_specified_type
	= type_specifier
	/ type_qualifier type_specifier
invariant_qualifier
	= INVARIANT
interpolation_qualifier
	= SMOOTH
	/ FLAT
layout_qualifier
	= LAYOUT LEFT_PAREN layout_qualifier_id_list RIGHT_PAREN
layout_qualifier_id_list
	= layout_qualifier_id
	/ layout_qualifier_id_list COMMA layout_qualifier_id
layout_qualifier_id
	= IDENTIFIER
IDENTIFIER EQUAL INTCONSTANT
	/ IDENTIFIER EQUAL UINTCONSTANT
parameter_type_qualifier
	= CONST


type_qualifier
	= storage_qualifier
	/ layout_qualifier
	/ layout_qualifier storage_qualifier
	/ interpolation_qualifier storage_qualifier
	/ interpolation_qualifier
	/ invariant_qualifier storage_qualifier
	/ invariant_qualifier interpolation_qualifier storage_qualifier
storage_qualifier
	= CONST
	/ IN
	/ OUT
	/ CENTROID IN
	/ CENTROID OUT
	/ UNIFORM
type_specifier
	= type_specifier_no_prec
	/ precision_qualifier type_specifier_no_prec
type_specifier_no_prec
	= type_specifier_nonarray
       type_specifier_nonarray LEFT_BRACKET RIGHT_BRACKET
       type_specifier_nonarray LEFT_BRACKET constant_expression RIGHT_BRACKET
type_specifier_nonarray
	= VOID
	/ FLOAT
	/ INT
	/ UINT
	/ BOOL
	/ VEC2
	/ VEC3
	/ VEC4
	/ BVEC2
	/ BVEC3
	/ BVEC4


	/ IVEC2
	/ IVEC3
	/ IVEC4
	/ UVEC2
	/ UVEC3
	/ UVEC4
	/ MAT2
	/ MAT3
	/ MAT4
	/ MAT2X2
	/ MAT2X3
	/ MAT2X4
	/ MAT3X2
	/ MAT3X3
	/ MAT3X4
	/ MAT4X2
	/ MAT4X3
	/ MAT4X4
	/ SAMPLER2D
	/ SAMPLER3D
	/ SAMPLERCUBE
	/ SAMPLER2DSHADOW
	/ SAMPLERCUBESHADOW
	/ SAMPLER2DARRAY
	/ SAMPLER2DARRAYSHADOW
	/ ISAMPLER2D
	/ ISAMPLER3D
	/ ISAMPLERCUBE
	/ ISAMPLER2DARRAY
	/ USAMPLER2D
	/ USAMPLER3D
	/ USAMPLERCUBE
	/ USAMPLER2DARRAY
	/ struct_specifier
	/ TYPE_NAME
precision_qualifier
	= HIGH_PRECISION


	/ MEDIUM_PRECISION
	/ LOW_PRECISION
struct_specifier
	= STRUCT IDENTIFIER LEFT_BRACE struct_declaration_list RIGHT_BRACE
	/ STRUCT LEFT_BRACE struct_declaration_list RIGHT_BRACE
struct_declaration_list
	= struct_declaration
	/ struct_declaration_list struct_declaration
struct_declaration
	= type_specifier struct_declarator_list SEMICOLON
	/ type_qualifier type_specifier struct_declarator_list SEMICOLON
struct_declarator_list
	= struct_declarator
	/ struct_declarator_list COMMA struct_declarator
struct_declarator
	= IDENTIFIER
	/ IDENTIFIER LEFT_BRACKET RIGHT_BRACKET
	/ IDENTIFIER LEFT_BRACKET constant_expression RIGHT_BRACKET
initializer
	= assignment_expression
declaration_statement
	= declaration
statement
	= compound_statement_with_scope
	/ simple_statement
statement_no_new_scope
	= compound_statement_no_new_scope
	/ simple_statement
statement_with_scope
	= compound_statement_no_new_scope
	/ simple_statement


// Grammar Note:  labeled statements for SWITCH only; 'goto' is not supported.
simple_statement
	= declaration_statement
	/ expression_statement
	/ selection_statement
	/ switch_statement
	/ case_label
	/ iteration_statement
	/ jump_statement
compound_statement_with_scope
	= LEFT_BRACE RIGHT_BRACE
	/ LEFT_BRACE statement_list RIGHT_BRACE
compound_statement_no_new_scope
	= LEFT_BRACE RIGHT_BRACE
	/ LEFT_BRACE statement_list RIGHT_BRACE
statement_list
	= statement
	/ statement_list statement
expression_statement
	= SEMICOLON
	/ expression SEMICOLON
selection_statement
	= IF LEFT_PAREN expression RIGHT_PAREN selection_rest_statement
selection_rest_statement
	= statement_with_scope ELSE statement_with_scope
	/ statement_with_scope
condition
	= expression
	/ fully_specified_type IDENTIFIER EQUAL initializer
switch_statement:


	/ SWITCH LEFT_PAREN expression RIGHT_PAREN LEFT_BRACE switch_statement_list
RIGHT_BRACE
switch_statement_list:
	/* nothing */
	/ statement_list
case_label
	= CASE expression COLON
	/ DEFAULT COLON
iteration_statement
	= WHILE LEFT_PAREN condition RIGHT_PAREN statement_no_new_scope
	/ DO statement_with_scope WHILE LEFT_PAREN expression RIGHT_PAREN SEMICOLON
	/ FOR LEFT_PAREN for_init_statement for_rest_statement RIGHT_PAREN
statement_no_new_scope
for_init_statement
	= expression_statement
	/ declaration_statement
conditionopt
	= condition
	/* empty */
for_rest_statement
	= conditionopt SEMICOLON
	/ conditionopt SEMICOLON expression
jump_statement
	= CONTINUE SEMICOLON
	/ BREAK SEMICOLON
	/ RETURN SEMICOLON
	/ RETURN expression SEMICOLON
	/ DISCARD SEMICOLON   // Fragment shader only.
// Grammar Note:  No 'goto'.  Gotos are not supported.
translation_unit
	= external_declaration
	/ translation_unit external_declaration


external_declaration
	= function_definition
	/ declaration
function_definition
	= function_prototype compound_statement_no_new_scope