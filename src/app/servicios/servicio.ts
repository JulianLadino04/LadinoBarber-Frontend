import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CrearServicioDTO } from '../dto/servicio/CrearServicioDTO';
import { EditarServicioDTO } from '../dto/servicio/EditarServicioDTO';
import { InformacionServicioDTO } from '../dto/servicio/InformacionServicioDTO';

@Injectable({
  providedIn: 'root'
})
export class Servicio {

  private baseUrl = 'http://localhost:8080/api/servicios';

  constructor(private http: HttpClient) {}

  public crearServicio(dto: CrearServicioDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}`, dto);
  }

  public editarServicio(id: string, dto: EditarServicioDTO): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, dto);
  }

  public obtenerPorId(id: string): Observable<InformacionServicioDTO> {
    return this.http.get<InformacionServicioDTO>(`${this.baseUrl}/${id}`);
  }

}
