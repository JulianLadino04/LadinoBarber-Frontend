import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CrearProductoDTO } from '../dto/producto/CrearProductoDTO';
import { EditarProductoDTO } from '../dto/producto/EditarProductoDTO';
import { InformacionProductoDTO } from '../dto/producto/InformacionProductoDTO';

@Injectable({
  providedIn: 'root'
})
export class Producto {

  private baseUrl = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient) {}

  public crearProducto(dto: CrearProductoDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}`, dto);
  }

  public editarProducto(id: string, dto: EditarProductoDTO): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, dto);
  }

  public obtenerPorId(id: string): Observable<InformacionProductoDTO> {
    return this.http.get<InformacionProductoDTO>(`${this.baseUrl}/${id}`);
  }

}
