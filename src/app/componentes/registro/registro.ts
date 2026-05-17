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
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.maxLength(10)]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmaPassword: ['', [Validators.required]]
    }, { validators: passwordMatchValidator() });

  }

  get nombre() {
    return this.registerForm.get('nombre');
  }

  get correo() {
    return this.registerForm.get('correo');
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

    const form = this.registerForm.value;

    const dto = {
      nombre: form.nombre,
      telefono: form.telefono,
      correo: form.correo,
      password: form.password
    };

    this.authService.crearCuenta(dto).subscribe({
      next: () => {
        Swal.fire(
          'Registrado',
          'Cuenta creada con éxito. Ya puedes iniciar sesión.',
          'success'
        ).then(() => this.router.navigate(['/login']));
      },
      error: (error) => {
        Swal.fire(
          'Error',
          error?.error?.respuesta || 'No fue posible crear la cuenta.',
          'error'
        );
      }
    });

  }

}