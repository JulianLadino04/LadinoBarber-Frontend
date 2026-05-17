import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

import { Producto } from '../../../servicios/producto';
import { CrearProductoDTO } from '../../../dto/producto/CrearProductoDTO';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './crear-producto.html',
  styleUrl: './crear-producto.css'
})
export class CrearProducto {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productoService: Producto,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      imagenUrl: [''],
      activo: [true]
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dto = this.form.value as CrearProductoDTO;

    this.productoService.crearProducto(dto).subscribe({
      next: () => Swal.fire('Éxito', 'Producto creado', 'success').then(() => this.router.navigate(['/'])),
      error: (err) => Swal.fire('Error', err?.error?.respuesta || 'No se pudo crear el producto', 'error')
    });
  }

}
