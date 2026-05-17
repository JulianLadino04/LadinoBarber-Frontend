import { TipoServicio } from '../enums/TipoServicio-enum';

export interface EditarServicioDTO {
  nombre: string;
  descripcion: string;
  tipo: TipoServicio;
  precio: number;
  duracionMinutos: number;
  imagenUrl?: string;
  activo?: boolean;
}
