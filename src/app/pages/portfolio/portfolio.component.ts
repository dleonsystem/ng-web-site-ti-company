import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html'
})
export class PortfolioComponent implements OnInit {
  proyectos: any[] = [];

  constructor(private portfolioService: PortfolioService) { }
  
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
      this.proyectos = data;
    });
  }
}
