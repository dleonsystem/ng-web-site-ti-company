import { Component, OnInit } from '@angular/core';
import { Servicio } from 'src/app/models/service.model';
import { SeoService } from 'src/app/services/seo.service';
import { ServiciosService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html'
})
export class ServicesComponent implements OnInit {
  servicios: Servicio[] = [];

  constructor(private readonly serviciosService: ServiciosService, private readonly seoService: SeoService) { }

  ngOnInit(): void {
    this.seoService.setServicesPage();
    this.serviciosService.obtenerServicios().subscribe(data => {
      this.servicios = data;
    });
  }
}
