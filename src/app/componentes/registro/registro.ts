import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

import { Auth } from '../../servicios/auth';

function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirm = control.get('confirmaPassword')?.value;
    return password && confirm && password !== confirm ? { passwordsMismatch: true } : null;
  };
}

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {

  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      cedula: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(7)]],
      confirmaPassword: ['', [Validators.required]]
    }, { validators: passwordMatchValidator() });
  }

  get cedula() {
    return this.registerForm.get('cedula');
  }

  get nombre() {
    return this.registerForm.get('nombre');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get direccion() {
    return this.registerForm.get('direccion');
  }

  get telefono() {
    return this.registerForm.get('telefono');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmaPassword() {
    return this.registerForm.get('confirmaPassword');
  }

  submit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.authService.crearCuenta(this.registerForm.value).subscribe({
      next: () => {
        Swal.fire('Registrado', 'Cuenta creada con éxito. Ya puedes iniciar sesión.', 'success')
          .then(() => this.router.navigate(['/login']));
      },
      error: (error) => {
        Swal.fire('Error', error?.error?.message || 'No fue posible crear la cuenta.', 'error');
      }
    });
  }

}
