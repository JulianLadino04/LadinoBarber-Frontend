import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

import { Servicio } from '../../../servicios/servicio';
import { TipoServicio } from '../../../dto/enums/TipoServicio-enum';
import { CrearServicioDTO } from '../../../dto/servicio/CrearServicioDTO';

@Component({
  selector: 'app-crear-servicio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './crear-servicio.html',
  styleUrl: './crear-servicio.css'
})
export class CrearServicio {

  form!: FormGroup;
  tipos = Object.values(TipoServicio);

  constructor(
    private fb: FormBuilder,
    private servicioService: Servicio,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      tipo: [this.tipos[0], [Validators.required]],
      precio: [0, [Validators.required, Validators.min(0)]],
      duracionMinutos: [30, [Validators.required, Validators.min(1)]],
      imagenUrl: [''],
      activo: [true]
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dto = this.form.value as CrearServicioDTO;

    this.servicioService.crearServicio(dto).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Servicio creado correctamente', 'success').then(() => this.router.navigate(['/']));
      },
      error: (err) => {
        Swal.fire('Error', err?.error?.respuesta || 'No se pudo crear el servicio', 'error');
      }
    });
  }

}
