export interface IPosition {
  i: number;
  j: number;
}

export interface ISize {
  x: number;
  y: number;
}

export interface IItem {
  id: string;
  data: string | null;
  position: IPosition;
  size: ISize;
}

export interface IFormData {
  iIndex: number;
  jIndex: number;
  xSize: number;
  ySize: number;
}

export type ItemType = "inventory" | "player" | "bag";
