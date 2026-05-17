import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

import { Servicio } from '../../../servicios/servicio';
import { InformacionServicioDTO } from '../../../dto/servicio/InformacionServicioDTO';

@Component({
  selector: 'app-detalle-servicio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-servicio.html',
  styleUrl: './detalle-servicio.css'
})
export class DetalleServicio implements OnInit {

  id: string = '';
  servicio?: InformacionServicioDTO;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicioService: Servicio
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';

    if (!this.id) {
      this.router.navigate(['/']);
      return;
    }

    this.servicioService.obtenerPorId(this.id).subscribe({
      next: (s) => this.servicio = s,
      error: () => {
        Swal.fire('Error', 'No fue posible cargar el servicio', 'error').then(() => this.router.navigate(['/']));
      }
    });
  }

  editar() {
    this.router.navigate([`/servicios/editar/${this.id}`]);
  }

  volver() {
    this.router.navigate(['/']);
  }

}
