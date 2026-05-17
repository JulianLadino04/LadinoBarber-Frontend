import { Routes } from '@angular/router';

import { Inicio } from './componentes/inicio/inicio';
import { Login } from './componentes/login/login';
import { Registro } from './componentes/registro/registro';
import { RecuperarPassword } from './componentes/recuperar-password/recuperar-password';
import { RestablecerPassword } from './componentes/restablecer-password/restablecer-password';
import { LoginGuard } from './guards/permiso';
import { RolesGuard } from './guards/roles';

import { CrearServicio } from './componentes/servicios/crear-servicio/crear-servicio';
import { EditarServicio } from './componentes/servicios/editar-servicio/editar-servicio';
import { DetalleServicio } from './componentes/servicios/detalle-servicio/detalle-servicio';

import { CrearProducto } from './componentes/productos/crear-producto/crear-producto';
import { EditarProducto } from './componentes/productos/editar-producto/editar-producto';
import { DetalleProducto } from './componentes/productos/detalle-producto/detalle-producto';

export const routes: Routes = [
  // Rutas públicas
  { path: '', component: Inicio },
  { path: 'login', component: Login, canActivate: [LoginGuard] },
  { path: 'registro', component: Registro },
  { path: 'recuperar-password', component: RecuperarPassword },
  { path: 'restablecer-password', component: RestablecerPassword },

  // Rutas protegidas (ADMINISTRADOR)
  { path: 'servicios/crear', component: CrearServicio, canActivate: [RolesGuard], data: { expectedRole: ['ADMINISTRADOR'] } },
  { path: 'servicios/editar/:id', component: EditarServicio, canActivate: [RolesGuard], data: { expectedRole: ['ADMINISTRADOR'] } },
  { path: 'servicios/:id', component: DetalleServicio, canActivate: [RolesGuard], data: { expectedRole: ['ADMINISTRADOR'] } },

  { path: 'productos/crear', component: CrearProducto, canActivate: [RolesGuard], data: { expectedRole: ['ADMINISTRADOR'] } },
  { path: 'productos/editar/:id', component: EditarProducto, canActivate: [RolesGuard], data: { expectedRole: ['ADMINISTRADOR'] } },
  { path: 'productos/:id', component: DetalleProducto, canActivate: [RolesGuard], data: { expectedRole: ['ADMINISTRADOR'] } },

  // Wildcard route
  { path: '**', redirectTo: '' }
];
