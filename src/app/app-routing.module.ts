import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';
import { SuccessCasesComponent } from './pages/casos-exito/success-cases.component';
import { AvisoPrivacidadComponent } from './pages/aviso-privacidad/aviso-privacidad.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { DetalleCasoComponent } from './pages/casos-exito/detalle-caso/detalle-caso.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Inicio | Lion Systems',
  },
  {
    path: 'nosotros',
    component: AboutComponent,
    title: 'Nosotros | Lion Systems',
  },
  {
    path: 'servicios',
    component: ServicesComponent,
    title: 'Servicios | Lion Systems',
  },
  {
    path: 'contacto',
    component: ContactComponent,
    title: 'Contacto | Lion Systems',
  },
  {
    path: 'blog',
    component: BlogComponent,
    title: 'Blog | Lion Systems',
  },
  {
    path: 'blog/:id',
    component: BlogDetailComponent,
    title: 'Detalle del Blog | Lion Systems',
  },
  {
    path: 'casos-exito',
    component: SuccessCasesComponent,
    title: 'Casos de Éxito | Lion Systems',
  },
{ path: 'casos-exito/:clave', component: DetalleCasoComponent },

  {
    path: 'aviso-privacidad',
    component: AvisoPrivacidadComponent,
    title: 'Aviso de Privacidad | Lion Systems',
  },

  { path: 'portafolio', component: PortfolioComponent, title: 'Portafolio | Lion Systems' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
