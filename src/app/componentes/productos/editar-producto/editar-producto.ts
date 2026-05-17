import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

import { Producto } from '../../../servicios/producto';
import { EditarProductoDTO } from '../../../dto/producto/EditarProductoDTO';
import { InformacionProductoDTO } from '../../../dto/producto/InformacionProductoDTO';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './editar-producto.html',
  styleUrl: './editar-producto.css'
})
export class EditarProducto implements OnInit {

  form: FormGroup;
  id: string = '';

  constructor(
    private fb: FormBuilder,
    private productoService: Producto,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: [0, [Validators.required, Validators.min(0)]],
      imagenUrl: [''],
      activo: [true]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (!this.id) { this.router.navigate(['/']); return; }

    this.productoService.obtenerPorId(this.id).subscribe({
      next: (p: InformacionProductoDTO) => {
        this.form.patchValue({
          nombre: p.nombre,
          descripcion: p.descripcion,
          precio: p.precio,
          imagenUrl: p.imagenUrl,
          activo: p.activo
        });
      },
      error: () => Swal.fire('Error', 'No fue posible cargar el producto', 'error').then(() => this.router.navigate(['/']))
    });
  }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    const dto = this.form.value as EditarProductoDTO;

    this.productoService.editarProducto(this.id, dto).subscribe({
      next: () => Swal.fire('Éxito', 'Producto actualizado', 'success').then(() => this.router.navigate(['/'])),
      error: (err) => Swal.fire('Error', err?.error?.respuesta || 'No fue posible actualizar', 'error')
    });
  }

}
