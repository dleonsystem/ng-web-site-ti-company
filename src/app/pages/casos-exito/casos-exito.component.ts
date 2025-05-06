import { Component, OnInit } from '@angular/core';
import { CasosExitoService } from '../../services/casos-exito.service';
import { CasoExito } from '../../models/caso-exito.model';

@Component({
  selector: 'app-casos-exito',
  templateUrl: './casos-exito.component.html',
  styleUrls: ['./casos-exito.component.scss']
})
export class CasosExitoComponent implements OnInit {
  casos: CasoExito[] = [];

  constructor(private casosService: CasosExitoService) {}

  ngOnInit(): void {
    this.casosService.obtenerCasos().subscribe(data => {
      this.casos = data;
    });
  }
}
