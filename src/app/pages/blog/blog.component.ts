import { Component } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
  posts = [
    {
      title: 'Soluciones de IA en Ciberseguridad',
      excerpt: 'Descubre cómo la inteligencia artificial fortalece la seguridad digital.',
      image: 'assets/images/blog/cyber-ai.jpg'
    },
    {
      title: 'Migración a la Nube sin Riesgos',
      excerpt: 'Guía práctica para mover tu infraestructura de forma segura.',
      image: 'assets/images/blog/cloud-migration.jpg'
    },
    {
      title: 'Ventajas del Software a la Medida',
      excerpt: 'Personaliza tus soluciones para escalar con agilidad.',
      image: 'assets/images/blog/software-custom.jpg'
    }
  ];
}