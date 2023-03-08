import { Time } from '@angular/common';
export interface AplicacionErrorDto {
  tituloError: string;
  descripcionError: string;
  nombreAplicacion: string;
  horaError: string;
  ipUsuario: string;
  navegadorUsuario: string;
}
export interface TrazabilidadCodigoDto {
  trazaError: string;
  origen: string;
}

export interface Issue {
  summary: string;
  description: string;
  projectname: string;
}
