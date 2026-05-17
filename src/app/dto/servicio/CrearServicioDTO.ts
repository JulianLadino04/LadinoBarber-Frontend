import { TipoServicio } from '../enums/TipoServicio-enum';

export interface CrearServicioDTO {
  nombre: string;
  descripcion: string;
  tipo: TipoServicio;
  precio: number;
  duracionMinutos: number;
  imagenUrl?: string;
  activo?: boolean;
}