import { Component, OnInit } from '@angular/core';
import { Servicio } from 'src/app/models/service.model';
import { ServiciosService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html'
})
export class ServicesComponent implements OnInit {
  servicios: Servicio[] = [];

  constructor(private serviciosService: ServiciosService) {}

  ngOnInit(): void {
    this.serviciosService.obtenerServicios().subscribe(data => {
      this.servicios = data;
    });
  }
}
