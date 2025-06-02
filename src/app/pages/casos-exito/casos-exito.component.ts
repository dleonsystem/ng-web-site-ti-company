import { Component, OnInit, OnDestroy } from '@angular/core';
import { CasosExitoService } from '../../services/casos-exito.service';
import { CasoExito } from '../../models/caso-exito.model';
import { TranslateService } from '@ngx-translate/core';
import { SeoService } from 'src/app/services/seo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-casos-exito',
  templateUrl: './casos-exito.component.html',
  styleUrls: ['./casos-exito.component.scss']
})
export class CasosExitoComponent implements OnInit, OnDestroy {
  casos: CasoExito[] = [];
  sectoresData: { key: string; value: string }[] = [
    { key: 'successCases.sectors.all', value: 'all' },
    { key: 'successCases.sectors.government', value: 'government' },
    { key: 'successCases.sectors.education', value: 'education' },
    { key: 'successCases.sectors.private', value: 'private' },
    { key: 'successCases.sectors.finance', value: 'finance' },
    { key: 'successCases.sectors.political', value: 'political' }
  ];
  sectorSeleccionado: string = 'all';
  private langChangeSubscription: Subscription = new Subscription();

  constructor(
    private casosService: CasosExitoService,
    private translate: TranslateService,
    private seoService: SeoService
  ) { }

  ngOnInit(): void {
    this.seoService.setCasosExitoPage();
    this.cargarCasos();

    // Suscribirse a cambios de idioma
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.cargarCasos();
    });
  }

  ngOnDestroy(): void {
    this.langChangeSubscription.unsubscribe();
  }

  private cargarCasos(): void {
    this.casosService.obtenerCasos().subscribe(data => {
      this.casos = data;
    });
  }

  get casosFiltrados() {
    if (this.sectorSeleccionado === 'all') {
      return this.casos;
    }

    // Mapear sectores en inglés a español para filtrado consistente
    const sectorMapping: { [key: string]: string[] } = {
      'government': ['Gobierno', 'Government'],
      'education': ['Educación', 'Education'],
      'private': ['Privado', 'Private'],
      'finance': ['Banca', 'Banking', 'Financial'],
      'political': ['Político', 'Political']
    };

    const sectoresPermitidos = sectorMapping[this.sectorSeleccionado] || [this.sectorSeleccionado];

    return this.casos.filter(c => sectoresPermitidos.includes(c.sector));
  }
}