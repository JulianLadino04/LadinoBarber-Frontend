import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = "AuthToken";

@Injectable({
  providedIn: 'root'
})
export class Token {

  constructor(private router: Router) {}

  public setToken(token: string) {

    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(TOKEN_KEY);
      window.sessionStorage.setItem(TOKEN_KEY, token);
    }

  }

  public getToken(): string | null {

    if (typeof window !== 'undefined') {
      return window.sessionStorage.getItem(TOKEN_KEY);
    }

    return null;

  }

  public isLogged(): boolean {

    if (typeof window !== 'undefined') {
      return !!window.sessionStorage.getItem(TOKEN_KEY);
    }

    return false;

  }

  public login(token: string) {

    this.setToken(token);

    const rol = this.getRol();
    const destino = rol === "ADMINISTRADOR" ? "/panel-admin" : "/";

    this.router.navigate([destino]);

  }

  public logout() {

    if (typeof window !== 'undefined') {
      window.sessionStorage.clear();
    }

    this.router.navigate(['/login'], { replaceUrl: true });

  }

  private decodePayload(token: string): any {

    if (!token || !token.includes('.')) {
      return {};
    }

    const payload = token.split(".")[1];

    try {

      const payloadDecoded = atob(payload);
      return JSON.parse(payloadDecoded);

    } catch {
      return {};
    }

  }

  public getIDCuenta(): string {

    const token = this.getToken();

    if (token) {
      const values = this.decodePayload(token);
      return values.id || "";
    }

    return "";

  }

  public getRol(): string {

    const token = this.getToken();

    if (token) {
      const values = this.decodePayload(token);
      return values.rol || "";
    }

    return "";

  }

  public getEmail(): string {

    const token = this.getToken();

    if (token) {
      const values = this.decodePayload(token);
      return values.sub || "";
    }

    return "";

  }

  public verTokenDecodificado(): any {

    const token = this.getToken();

    if (!token) {
      console.log('❌ No hay token');
      return null;
    }

    const values = this.decodePayload(token);
    console.log('📦 Token decodificado:', values);

    return values;

  }

}