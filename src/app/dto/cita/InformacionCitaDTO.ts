export interface InformacionCitaDTO {
  id: string
  clienteId: string
  nombreCliente: string
  telefonoCliente: string
  barberoId: string
  nombreBarbero: string
  servicioId: string
  nombreServicio: string
  fecha: string
  horaInicio: string
  horaFin: string
  precioBase: number
  precioFinal: number
  bonoAplicado: boolean
  estado: string
  observaciones: string
  citaOriginalId: string
  confirmacionEnviada: boolean
  recordatorioEnviado: boolean
  fechaCreacion: string
}