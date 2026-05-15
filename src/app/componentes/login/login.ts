import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

import { Auth } from '../../servicios/auth';
import { Token } from '../../servicios/token';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private tokenService: Token,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]]
    });
  }

  get correo() {
    return this.loginForm.get('correo');
  }

  get contrasena() {
    return this.loginForm.get('contrasena');
  }

  submit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authService.iniciarSesion(this.loginForm.value).subscribe({
      next: (response) => {
        if (response?.token) {
          this.tokenService.login(response.token);
        } else {
          Swal.fire('Error', 'No se obtuvo token de autenticación.', 'error');
        }
      },
      error: (error) => {
        Swal.fire('Error', error?.error?.message || 'Credenciales incorrectas', 'error');
      }
    });
  }

}
