import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { Token } from '../../servicios/token';
import { Auth } from '../../servicios/auth';

interface NavLink {
  label: string;
  route: string;
  roles: string[];
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {

  isLogged: boolean = false;
  user: string = '';
  rol: string = '';
  sidebarOpen: boolean = false;

  linksFiltrados: NavLink[] = [];

  readonly navLinks: NavLink[] = [

    { label: 'Servicios', route: '/servicios', roles: ['CLIENTE','ADMIN','BARBERO'] },

    { label: 'Barberos', route: '/barberos', roles: ['CLIENTE','ADMIN'] },

    { label: 'Reservar Cita', route: '/reservar-cita', roles: ['CLIENTE'] },

    { label: 'Mis Citas', route: '/mis-citas', roles: ['CLIENTE'] },

    { label: 'Agenda del Barbero', route: '/agenda-barbero', roles: ['BARBERO'] },

    { label: 'Administrar Citas', route: '/admin-citas', roles: ['ADMIN'] },

    { label: 'Promociones', route: '/promociones', roles: ['ADMIN'] }

  ];

  constructor(
    private tokenService: Token,
    private authService: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.cargarSesion();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {

        this.cerrarSidebar();
        this.cargarSesion();

      });

  }

  cargarSesion(): void {

    this.isLogged = this.tokenService.isLogged();

    if (this.isLogged) {

      const data = this.tokenService.verTokenDecodificado();

      this.user = data?.nombre || data?.name || data?.sub || 'Usuario';
      this.rol = this.tokenService.getRol() || '';

      console.log("ROL DEL TOKEN:", this.rol);

      this.linksFiltrados = this.navLinks.filter(link =>
        link.roles.includes(this.rol)
      );

    } else {

      this.user = '';
      this.rol = '';
      this.linksFiltrados = [];

    }

  }

  toggleSidebar(): void {

    this.sidebarOpen = !this.sidebarOpen;

  }

  cerrarSidebar(): void {

    this.sidebarOpen = false;

  }

  logout(): void {

    this.tokenService.logout();

    this.isLogged = false;
    this.user = '';
    this.rol = '';
    this.linksFiltrados = [];
    this.sidebarOpen = false;

    this.router.navigate(['/login']);

  }

}