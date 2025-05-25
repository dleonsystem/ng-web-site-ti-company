import { Component, OnInit } from '@angular/core';
import { CasosExitoService } from '../../services/casos-exito.service';
import { CasoExito } from '../../models/caso-exito.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-casos-exito',
  templateUrl: './casos-exito.component.html',
  styleUrls: ['./casos-exito.component.scss']
})
export class CasosExitoComponent implements OnInit {
  casos: CasoExito[] = [];
  sectoresData: { key: string; value: string }[] = [
    { key: 'successCases.sectors.all', value: 'Todos' },
    { key: 'successCases.sectors.government', value: 'Gobierno' },
    { key: 'successCases.sectors.education', value: 'Educación' },
    { key: 'successCases.sectors.private', value: 'Privado' },
    { key: 'successCases.sectors.finance', value: 'Banca' }
  ];
  sectorSeleccionado: string = 'Todos';


  constructor(private casosService: CasosExitoService, private translate: TranslateService) { }

  ngOnInit(): void {
    this.casosService.obtenerCasos().subscribe(data => {
      this.casos = data;
    });
  }
  get casosFiltrados() {
    if (this.sectorSeleccionado === 'Todos') {
      return this.casos;
    }
    return this.casos.filter(c => c.sector === this.sectorSeleccionado);
  }

}
