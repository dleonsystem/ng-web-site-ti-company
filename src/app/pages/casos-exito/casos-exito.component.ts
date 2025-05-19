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
  sectores: string[] = ['Todos', 'Gobierno', 'Educación', 'Privado', 'Banca'];
sectorSeleccionado: string = 'Todos';


  constructor(private casosService: CasosExitoService) {}

  ngOnInit(): void {
    this.casosService.obtenerCasos().subscribe(data => {
      this.casos = data;
    });
  }
  get casosFiltrados() {
  if (this.sectorSeleccionado === 'Todos') {
    console.log('Todos los casos');
    return this.casos;
  }
  return this.casos.filter(c => c.sector === this.sectorSeleccionado);
}

}
