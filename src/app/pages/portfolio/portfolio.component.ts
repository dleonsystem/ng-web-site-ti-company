import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html'
})
export class PortfolioComponent implements OnInit {
  proyectos: any[] = [];

  constructor(
    private portfolioService: PortfolioService,
    private translate: TranslateService // Inyectar TranslateService
  ) { }

  filtroActivo: string = 'all'; // Initialize with the key 'all' for "Todos"
  filtrosKeys: string[] = ['all', 'education', 'government', 'banking', 'private']; // Store filter keys, not translated values


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
    });

    // You can load the translated filter names if needed for display,
    // but the filtering logic should use the keys.
    // For now, we'll rely on the HTML to translate the keys for display.
  }

  filtrar(filterKey: string): void {
    this.filtroActivo = filterKey; // Store the key directly

    if (filterKey === 'all') {
      this.proyectosVisibles = this.todosLosProyectos;
    } else {
      this.proyectosVisibles = this.todosLosProyectos.filter(p => {
        // You need to ensure that 'p.sector' in your JSON matches the translated value of the filter key
        // in the CURRENT language. This is the most robust way to handle it.
        const translatedFilterValue = this.translate.instant('portfolio.filters.' + filterKey);
        return p.sector === translatedFilterValue;
      });
    }
  }
}