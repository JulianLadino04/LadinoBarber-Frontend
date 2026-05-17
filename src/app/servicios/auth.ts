import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LoginDTO } from '../dto/cuenta/LoginDTO';
import { RecuperarContrasenaDTO } from '../dto/cuenta/RecuperarContrasenaDTO';
import { RestablecerContrasenaDTO } from '../dto/cuenta/RestablecerContrasenaDTO';

import { TokenDTO } from '../dto/TokenDTO';
import { MensajeDTO } from '../dto/MensajeDTO';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private authURL = "http://localhost:8080/api/auth";

  constructor(private http: HttpClient) {}

  /**
   * LOGIN
   */
  public iniciarSesion(loginDTO: LoginDTO): Observable<TokenDTO> {
    return this.http.post<TokenDTO>(`${this.authURL}/login`, loginDTO);
  }

  /**
   * CREAR CUENTA
   */
  public crearCuenta(registroDTO: any): Observable<string> {
    return this.http.post(`${this.authURL}/registro`, registroDTO, {
    responseType: 'text'
  });
}

  /**
   * RECUPERAR CONTRASEÑA
   */
  public recuperarContrasena(dto: RecuperarContrasenaDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/recuperar`, dto);
  }

  /**
   * RESTABLECER CONTRASEÑA
   */
  public restablecerContrasena(dto: RestablecerContrasenaDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/restablecer`, dto);
  }

}