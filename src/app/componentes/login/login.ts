import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

import { Auth } from '../../servicios/auth';
import { Token } from '../../servicios/token';
import { LoginDTO } from '../../dto/cuenta/LoginDTO';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

  loginForm!: FormGroup;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private tokenService: Token,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]]
    });
  }

  public iniciarSesion() {

    console.log('🚀 Iniciando proceso de login...');

    if (this.loginForm.invalid) {
      console.warn('⚠️ Formulario inválido:', this.loginForm.value);

      Swal.fire(
        'Error',
        'Por favor completa correctamente el correo y la contraseña',
        'error'
      );

      return;
    }

    const loginDTO = this.loginForm.value as LoginDTO;

    console.log('📤 Datos enviados al backend:', loginDTO);

    this.authService.iniciarSesion(loginDTO).subscribe({

      next: (response: any) => {

        console.log('📥 RESPUESTA REAL DEL BACKEND:', response);

        if (!response || !response.datos || !response.datos.token) {
          Swal.fire('Error', 'Respuesta inválida del servidor', 'error');
          return;
        }

        console.log('🔐 TOKEN COMPLETO:', response.datos.token);
        console.log('🔍 Tipo de token:', typeof response.datos.token);
        console.log('📏 Longitud del token:', response.datos.token.length);

        const token = response.datos.token;

        this.tokenService.login(token);

        console.log('✅ Token guardado en el servicio');

        Swal.fire(
          'Éxito',
          'Inicio de sesión exitoso',
          'success'
        );
      },

      error: (err: any) => {

        console.error('❌ ERROR COMPLETO:', err);
        console.error('📛 Status:', err.status);
        console.error('📛 Mensaje:', err.error);

        const mensaje =
          err.error?.respuesta ||
          err.error?.mensaje ||
          err.error?.message ||
          'Error en el inicio de sesión';

        Swal.fire('Error', mensaje, 'error');
      },

      complete: () => {
        console.log('🏁 Proceso de login finalizado');
      }

    });
  }

}