import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html'
})
export class PortfolioComponent implements OnInit {
  proyectos: any[] = [];

  constructor(private portfolioService: PortfolioService) { }

  filtroActivo: string = '';
  filtros: string[] = ['Educación', 'Gobierno', 'Banca', 'Privado']; // o ['Angular', 'Node.js', 'GraphQL']

  todosLosProyectos: any[] = [];  // todos los del JSON
  proyectosVisibles: any[] = []; // filtrados

  trackPortafolioCTA(proyecto: string): void {
    if ((<any>window).gtag) {
      (<any>window).gtag('event', 'click', {
        event_category: 'Portafolio',
        event_label: proyecto,
        value: 1
      });
    }
  }

  ngOnInit(): void {
    this.portfolioService.obtenerProyectos().subscribe(data => {
      this.todosLosProyectos = data;
      this.proyectosVisibles = this.todosLosProyectos;
      this.proyectos = data;
    });
  }
  filtrar(filtro: string): void {
    this.filtroActivo = filtro;
    if (!filtro) {
      this.proyectosVisibles = this.todosLosProyectos;
    } else {
      this.proyectosVisibles = this.todosLosProyectos.filter(p => p.sector === filtro); // o p.tecnologia.includes(filtro)
    }
  }
}
