import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private router: Router) {}
  

  trackCotizacion(servicio: string, destino: string): void {
      this.router.navigateByUrl(destino);
    if ((<any>window).gtag) {
      (<any>window).gtag('event', 'click', {
        event_category: 'Cotización',
        event_label: servicio,
        value: 1
      });
    }
  }

  logCTA(): void {
    if ((<any>window).gtag) {
      (<any>window).gtag('event', 'click', {
        event_category: 'CTA',
        event_label: 'Consultoría Gratuita',
        value: 1
      });
    }
    // Aquí podrías integrar Google Analytics o Matomo en el futuro
  }
testimonios = [
  {
    nombre: 'Jesús Covarrubias',
    proyecto: 'Sistema de Credencialización',
    comentario: 'Un trabajo profesional, seguro y rápido. Superó nuestras expectativas.',
    estrellas: 5,
    avatar: 'assets/images/avatar.png'
  },
  {
    nombre: 'Carlos Rivas',
    proyecto: 'Cámara de Diputados',
    comentario: 'Con Lion Systems migramos nuestros sistemas sin interrupciones.',
    estrellas: 5,
    avatar: 'assets/images/avatar.png'
  }
];

  servicios = [
    {
      icono: 'code',
      nombre: 'Desarrollo de Software',
      descripcion: 'Aplicaciones modernas, escalables y a medida.',
      precio: '$350 USD/hora',
      link: '/contacto?servicio=code',
      eventoGA: 'cotizacion_api'
    },
    {
      icono: 'memory',
      nombre: 'Inteligencia Artificial',
      descripcion: 'Soluciones inteligentes para automatizar decisiones.',
      precio: '$400 USD/hora',
      link: '/contacto?servicio=ia',
      eventoGA: 'cotizacion_ia'
    },
    {
      icono: 'security',
      nombre: 'Ciberseguridad',
      descripcion: 'Protección avanzada de datos y sistemas.',
      precio: '$450 USD/hora',
      link: '/contacto?servicio=security',
      eventoGA: 'cotizacion_segiridad'
    },
    {
      nombre: 'APIs Seguras y Escalables',
      descripcion: 'Diseño e implementación de APIs GraphQL o REST con autenticación y control de acceso.',
      icono: 'api',
      precio: '$350 USD',
      link: '/contacto?servicio=api',
      eventoGA: 'cotizacion_api'
    },
    {
      nombre: 'Aplicaciones Móviles Híbridas',
      descripcion: 'Apps con Ionic + Angular listas para Android e iOS, con funcionalidades offline y GPS.',
      icono: 'smartphone',
      precio: '$500 USD',
      link: '/contacto?servicio=movil',
      eventoGA: 'cotizacion_movil'
    },
    {
      nombre: 'Dashboards Administrativos',
      descripcion: 'Visualización de datos, reportes, KPIs e interfaces personalizadas con control de roles.',
      icono: 'bar_chart',
      precio: '$450 USD',
      link: '/contacto?servicio=dashboard',
      eventoGA: 'cotizacion_dashboard'
    },
    {
      nombre: 'Migración a la Nube',
      descripcion: 'Migración segura a AWS o GCP, arquitectura escalable, respaldo y seguridad integrada.',
      icono: 'cloud_upload',
      precio: '$400 USD',
      link: '/contacto?servicio=nube',
      eventoGA: 'cotizacion_nube'
    }
  ];
}
