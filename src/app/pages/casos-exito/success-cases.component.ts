import { Component, OnInit, OnDestroy } from '@angular/core';
import { CasosExitoService } from '../../services/casos-exito.service';
import { CasoExito } from '../../models/caso-exito.model';
import { TranslateService } from '@ngx-translate/core';
import { SeoService } from 'src/app/services/seo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-success-cases',
  templateUrl: './success-cases.component.html',
  styleUrls: ['./success-cases.component.scss']
})
export class SuccessCasesComponent implements OnInit, OnDestroy {
    // 1. Array para almacenar TODOS los casos de éxito originales del servicio.
  casos: CasoExito[] = [];
    // 2. Array para almacenar los casos que se van a MOSTRAR en la vista (puede cambiar con los filtros).
  filteredCasos: CasoExito[] = [];
    // 3. Array para almacenar las categorías únicas que extraemos de los datos.
  categories: string[] = [];
    // 4. Propiedad para saber qué categoría está seleccionada actualmente.
  selectedCategory: string | null = null;
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
    const idiomaActual = this.translate.currentLang as 'es' | 'en' || 'es';

    this.casosService.obtenerCasosPorIdioma(idiomaActual).subscribe(data => {
      this.casos = data;
        // Al principio, mostramos todos los casos.
      this.filteredCasos = data;
      // Extraemos las categorías únicas para crear los botones de filtro.
      this.extractCategories();
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
   /**
   * Extrae todas las categorías únicas de los casos de éxito para generar los botones de filtro.
   * Usa un Set para evitar duplicados de forma eficiente.
   */
  extractCategories(): void {
    const categorySet = new Set<string>();
    this.casos.forEach(caso => categorySet.add(caso.sector));
    this.categories = [...categorySet];
  }

  /**
   * Filtra los casos de éxito mostrados en la vista según la categoría seleccionada.
   * @param category La categoría por la cual filtrar, o null para mostrar todos.
   */
  filterByCategory(category: string | null): void {
    // Actualizamos la categoría seleccionada para que el botón [class.active] funcione.
    this.selectedCategory = category;

    if (!category) {
      // Si no hay categoría seleccionada (se hizo clic en "Todos"), mostramos todos los casos.
      this.filteredCasos = this.casos;
    } else {
      // Filtramos el array original para encontrar solo los casos que coincidan con la categoría.
      this.filteredCasos = this.casos.filter(
        (caso) => caso.sector === category
      );
    }
  }
}