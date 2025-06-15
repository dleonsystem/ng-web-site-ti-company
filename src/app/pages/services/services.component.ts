import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Servicio } from 'src/app/models/service.model';
import { SeoService } from 'src/app/services/seo.service';
import { ServiciosService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html'
})
export class ServicesComponent implements OnInit {
  servicios: Servicio[] = [];

  constructor(private readonly serviciosService: ServiciosService, private readonly seoService: SeoService, private readonly translateService: TranslateService) { }
  trackServiceCTA(proyecto: string): void {
    if ((<any>window).gtag) {
      (<any>window).gtag('event', 'click', {
        event_category: 'Portafolio',
        event_label: proyecto,
        value: 1
      });
    }
  }

  ngOnInit(): void {
    this.seoService.setServicesPage();
        this.cargarServicios();
        // Suscribirse a cambios de idioma
    this.translateService.onLangChange.subscribe(() => {
      this.cargarServicios();
    });

  }
  private cargarServicios(): void {
    const idiomaActual = this.translateService.currentLang as 'es' | 'en' || 'es';
    console.log('Cargando servicios para el idioma:', idiomaActual);
    this.serviciosService.obtenerServicios(idiomaActual).subscribe(data => {
      this.servicios = data;
    });
  }
}
