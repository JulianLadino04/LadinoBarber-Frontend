import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

import { Servicio } from '../../../servicios/servicio';
import { TipoServicio } from '../../../dto/enums/TipoServicio-enum';
import { EditarServicioDTO } from '../../../dto/servicio/EditarServicioDTO';
import { InformacionServicioDTO } from '../../../dto/servicio/InformacionServicioDTO';

@Component({
  selector: 'app-editar-servicio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './editar-servicio.html',
  styleUrl: './editar-servicio.css'
})
export class EditarServicio implements OnInit {

  form!: FormGroup;
  tipos = Object.values(TipoServicio);
  id: string = '';

  constructor(
    private fb: FormBuilder,
    private servicioService: Servicio,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      precio: [0, [Validators.required, Validators.min(0)]],
      duracionMinutos: [30, [Validators.required, Validators.min(1)]],
      imagenUrl: [''],
      activo: [true]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';

    if (!this.id) {
      this.router.navigate(['/']);
      return;
    }

    this.servicioService.obtenerPorId(this.id).subscribe({
      next: (s: InformacionServicioDTO) => {
        this.form.patchValue({
          nombre: s.nombre,
          descripcion: s.descripcion,
          tipo: s.tipo,
          precio: s.precio,
          duracionMinutos: s.duracionMinutos,
          imagenUrl: s.imagenUrl,
          activo: s.activo
        });
      },
      error: () => {
        Swal.fire('Error', 'No fue posible cargar el servicio', 'error').then(() => this.router.navigate(['/']));
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dto = this.form.value as EditarServicioDTO;

    this.servicioService.editarServicio(this.id, dto).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Servicio actualizado', 'success').then(() => this.router.navigate(['/']));
      },
      error: (err) => Swal.fire('Error', err?.error?.respuesta || 'No fue posible actualizar', 'error')
    });
  }

}
