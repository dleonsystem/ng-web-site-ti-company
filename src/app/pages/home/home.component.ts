// src/app/pages/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from 'src/app/services/servicio.service'; // Importa Servicio
import { PortfolioService } from 'src/app/services/portfolio.service'; // Asegúrate de importar PortfolioService
import { forkJoin } from 'rxjs'; // Para cargar múltiples servicios
import { SeoService } from 'src/app/services/seo.service';
import { TranslateService } from '@ngx-translate/core';
import { Servicio } from 'src/app/models/service.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  servicios: Servicio[] = []; // Declarar array de servicios
  featuredServices: Servicio[] = []; // Usaremos la interfaz Servicio
  featuredPortfolio: any[] = []; // Puedes crear una interfaz para PortfolioProject si es necesario
  clientLogos = [
    { src: 'assets/images/logos/sep.png', alt: 'SEP' },
    { src: 'assets/images/logos/morena.png', alt: 'Morena' },
    { src: 'assets/images/logos/diputados.png', alt: 'Cámara de Diputados' },
    { src: 'assets/images/logos/axa.png', alt: 'Axa' },
    { src: 'assets/images/logos/bbva.png', alt: 'BBVA' },
    { src: 'assets/images/logos/digipro.png', alt: 'Digipro' },
    { src: 'assets/images/logos/invex.png', alt: 'INVEX' },
    { src: 'assets/images/logos/santander.png', alt: 'Santander' },
    { src: 'assets/images/logos/gentera.png', alt: 'Gentera' },
    { src: 'assets/images/logos/rlh-properties.png', alt: 'RLH Properties' },
    { src: 'assets/images/logos/nmp.png', alt: 'Nacional Monte de Piedad' },
    { src: 'assets/images/logos/ibm.png', alt: 'IBM' },
    // { src: 'assets/images/logos/pemex.png', alt: 'Pemex' },
    { src: 'assets/images/logos/cfe.png', alt: 'CFE' },
    // { src: 'assets/images/logos/sct.png', alt: 'SCT' },
    // { src: 'assets/images/logos/imss.png', alt: 'IMSS' },
    { src: 'assets/images/logos/issste.png', alt: 'ISSSTE' },
    { src: 'assets/images/logos/conagua.png', alt: 'CONAGUA' },
  ];

  constructor(
    private readonly router: Router,
    private readonly serviciosService: ServiciosService, // Inyecta el servicio de servicios
    private readonly portfolioService: PortfolioService, // Inyecta el servicio de portafolio
    private readonly seoService: SeoService,
    private readonly translate: TranslateService
  ) { }

  ngOnInit(): void {
    const navegadorLang = navigator.language || (navigator as any).userLanguage; // ej. 'en-US' o 'es-MX'

    const esEspanol = navegadorLang.toLowerCase().startsWith('es');
    const idioma = esEspanol ? 'es' : 'en';
    this.translate.use(idioma); // Establece el idioma de la app
    this.seoService.setHomePage();
    if (this.translate.currentLang === 'es') {
    this.serviciosService.obtenerServicios('es').subscribe(data => {
      this.servicios = data; // Cargar los servicios desde el JSON
    });
    this.portfolioService.obtenerProyectosPorIdioma('es').subscribe(data => {
      this.featuredPortfolio = data; // Cargar los proyectos destacados
    });
  } else {
    this.serviciosService.obtenerServicios('en').subscribe(data => {
      this.servicios = data; // Cargar los servicios desde el JSON en inglés
    });
    this.portfolioService.obtenerProyectosPorIdioma('en').subscribe(data => {
      this.featuredPortfolio = data; // Cargar los proyectos destacados en inglés
    }); 
  }
  }

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
  }

  trackPortafolioCTA(proyecto: string): void {
    if ((<any>window).gtag) {
      (<any>window).gtag('event', 'click', {
        event_category: 'Portafolio',
        event_label: proyecto,
        value: 1
      });
    }
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
    },
    {
      nombre: 'Ana Gómez',
      proyecto: 'Plataforma de E-learning',
      comentario: 'Su solución de e-learning ha transformado la manera en que educamos a nuestros estudiantes. Muy intuitiva y robusta.',
      estrellas: 5,
      avatar: 'assets/images/avatar.png'
    },
    {
      nombre: 'Ricardo Morales',
      proyecto: 'CRM Financiero',
      comentario: 'El CRM que desarrollaron nos ha permitido mejorar significativamente el seguimiento a clientes y las ventas. Excelente soporte.',
      estrellas: 4,
      avatar: 'assets/images/avatar.png'
    }
  ];
}