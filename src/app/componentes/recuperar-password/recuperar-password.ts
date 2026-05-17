import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

import { Auth } from '../../servicios/auth';
import { RecuperarContrasenaDTO } from '../../dto/cuenta/RecuperarContrasenaDTO';

@Component({
  selector: 'app-recuperar-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './recuperar-password.html',
  styleUrl: './recuperar-password.css'
})
export class RecuperarPassword {

  recuperarForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router
  ) {
    this.recuperarForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  get correo() {
    return this.recuperarForm.get('correo');
  }

  submit() {
    if (this.recuperarForm.invalid) {
      this.recuperarForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const dto: RecuperarContrasenaDTO = {
      correo: this.recuperarForm.get('correo')?.value
    };

    this.authService.recuperarContrasena(dto).subscribe({
      next: (response) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Se envió un código de recuperación a tu correo',
          confirmButtonColor: '#c59d5f'
        }).then(() => {
          this.router.navigate(['/restablecer-password']);
        });
      },
      error: (error) => {
        this.isLoading = false;
        Swal.fire('Error', error?.error?.message || 'No se pudo enviar el código', 'error');
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
