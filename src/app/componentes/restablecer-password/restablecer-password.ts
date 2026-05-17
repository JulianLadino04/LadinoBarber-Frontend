import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

import { Auth } from '../../servicios/auth';
import { RestablecerContrasenaDTO } from '../../dto/cuenta/RestablecerContrasenaDTO';

@Component({
  selector: 'app-restablecer-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './restablecer-password.html',
  styleUrl: './restablecer-password.css'
})
export class RestablecerPassword {

  restablecerForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router
  ) {
    this.restablecerForm = this.fb.group({
      codigoRecuperacion: ['', [Validators.required]],
      nuevaContrasena: ['', [Validators.required, Validators.minLength(7)]],
      confirmarContrasena: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator() });
  }

  get codigoRecuperacion() {
    return this.restablecerForm.get('codigoRecuperacion');
  }

  get nuevaContrasena() {
    return this.restablecerForm.get('nuevaContrasena');
  }

  get confirmarContrasena() {
    return this.restablecerForm.get('confirmarContrasena');
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('nuevaContrasena');
      const confirmPassword = control.get('confirmarContrasena');

      if (!password || !confirmPassword) {
        return null;
      }

      return password.value === confirmPassword.value ? null : { passwordMismatch: true };
    };
  }

  submit() {
    if (this.restablecerForm.invalid) {
      this.restablecerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const dto: RestablecerContrasenaDTO = {
      codigoRecuperacion: this.restablecerForm.get('codigoRecuperacion')?.value,
      nuevaContrasena: this.restablecerForm.get('nuevaContrasena')?.value,
      confirmarContrasena: this.restablecerForm.get('confirmarContrasena')?.value
    };

    this.authService.restablecerContrasena(dto).subscribe({
      next: (response) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Contraseña restablecida correctamente',
          confirmButtonColor: '#c59d5f'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (error) => {
        this.isLoading = false;
        Swal.fire('Error', error?.error?.message || 'No se pudo restablecer la contraseña', 'error');
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
