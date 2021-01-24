export class DeclaratorListDeclarator {
  constructor(
    public name: Identifier,
    public isArray: boolean,
    public arraySize: number | null,
    public initializer: Expression | null,
  ) {}
}
export class StructDeclaration {
  constructor(
    public name: Identifier | null,
    public members: InitDeclaratorList[],
  ) {}
}
export interface InitDeclaratorList extends Qualified {}
export class InitDeclaratorList {
  constructor(
    public type: Type,
    public declarators: DeclaratorListDeclarator[],
  ) {}
}
export type Type = any
export type Expression = any
type Identifier = Token<"IDENTIFIER">
export type Token<T extends string> = {
  type: T
  value: string
}

export interface Qualified {
  storage:
    | Token<"IN">
    | Token<"OUT">
    | Token<"UNIFORM">
    | Token<"VARYING">
    | Token<"ATTRIBUTE">
    | null
  centroid: Token<"CENTROID"> | null
  type: Token<string>
}

export interface InterfaceBlock extends Qualified {}
export class InterfaceBlock {
  constructor(
    public name: Identifier,
    public members: InitDeclaratorList[],
    public instanceName: Identifier | null,
    public instanceArraySize: any | null,
  ) {}
}
