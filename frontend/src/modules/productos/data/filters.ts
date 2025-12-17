export const telas = ["cuero", "tela", "terciopelo"] as const;
export const tamanos = ["Sencillo", "Doble", "Queen", "King"] as const;

export type Tela = typeof telas[number];
export type Tamano = typeof tamanos[number];

export const PRECIO_MIN = 0;
export const PRECIO_MAX = 10000000;

export interface FilterState {
  categoria: string | null;
  tela: string | null;
  tamano: string | null;
  precioMin: number;
  precioMax: number;
}
