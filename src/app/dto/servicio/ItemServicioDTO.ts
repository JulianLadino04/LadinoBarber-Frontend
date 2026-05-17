import { TipoServicio } from "../enums/TipoServicio-enum"

export interface ItemServicioDTO {
  nombre: string
  descripcion: string
  tipo: TipoServicio
  precio: number
  duracionMinutos: number
  imagenUrl: string
}