import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

import { Producto } from '../../../servicios/producto';
import { InformacionProductoDTO } from '../../../dto/producto/InformacionProductoDTO';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-producto.html',
  styleUrl: './detalle-producto.css'
})
export class DetalleProducto implements OnInit {

  id: string = '';
  producto?: InformacionProductoDTO;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: Producto
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (!this.id) { this.router.navigate(['/']); return; }

    this.productoService.obtenerPorId(this.id).subscribe({
      next: (p) => this.producto = p,
      error: () => Swal.fire('Error', 'No fue posible cargar el producto', 'error').then(() => this.router.navigate(['/']))
    });
  }

  editar() { this.router.navigate([`/productos/editar/${this.id}`]); }
  volver() { this.router.navigate(['/']); }

}
