import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  logCTA(): void {
  console.log('CTA clickeado');
  if ((<any>window).gtag) {
    (<any>window).gtag('event', 'click', {
      event_category: 'CTA',
      event_label: 'Consultoría Gratuita',
      value: 1
    });
  }
  // Aquí podrías integrar Google Analytics o Matomo en el futuro
}

  servicios = [
    {
      icono: 'code',
      nombre: 'Desarrollo de Software',
      descripcion: 'Aplicaciones modernas, escalables y a medida.'
    },
    {
      icono: 'memory',
      nombre: 'Inteligencia Artificial',
      descripcion: 'Soluciones inteligentes para automatizar decisiones.'
    },
    {
      icono: 'security',
      nombre: 'Ciberseguridad',
      descripcion: 'Protección avanzada de datos y sistemas.'
    },
    {
      icono: 'cloud',
      nombre: 'Soluciones en la Nube',
      descripcion: 'Escalabilidad y eficiencia con arquitectura cloud.'
    }
  ];
}
