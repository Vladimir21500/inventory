export interface IItem {
  id: string;
  data: string | null;
}

export type ItemType = "inventory" | "player" | "bag";
