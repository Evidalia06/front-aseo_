export interface ResponseConsejo {
  data: Consejo[];
}

export interface Consejo {
  id: number;
  nombre_consejo: string;
  descripcion: string;
  img: string;
}