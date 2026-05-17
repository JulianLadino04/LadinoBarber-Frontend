
import { TipoServicio } from "../enums/TipoServicio-enum"

export interface InformacionServicioDTO {
  nombre: string
  descripcion: string
  tipo: TipoServicio
  precio: number
  duracionMinutos: number
  imagenUrl: string
  activo: boolean
}