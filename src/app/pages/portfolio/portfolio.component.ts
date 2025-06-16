import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Project } from 'src/app/models/project.model';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  
  proyectos: any[] = [];
// --- PROPIEDADES NUEVAS Y HOMOLOGADAS ---
  // Estas propiedades solucionan los errores del compilador en el HTML.

  /** Almacena TODOS los proyectos cargados del servicio para el idioma actual. Es nuestra fuente de verdad. */
  allProjects: Project[] = [];

  /** Almacena los proyectos que se están mostrando en la vista (resultado del filtrado). */
  filteredProjects: Project[] = [];

  /** Almacena las categorías únicas extraídas de los datos para generar los botones. */
  categories: string[] = [];

  /** Almacena la clave de la categoría actualmente seleccionada (ej: 'education', 'banking'). null para "Todos". */
  selectedCategory: string | null = 'all'; // Inicia con 'all' para que el primer botón esté activo.

  constructor(
    private readonly portfolioService: PortfolioService,
    private readonly translate: TranslateService, // Inyectar TranslateService
    private readonly seoService: SeoService
  ) { }

  filtroActivo: string = 'all'; // Initialize with the key 'all' for "Todos"
  filtrosKeys: string[] = ['all', 'education', 'government', 'banking', 'private']; // Store filter keys, not translated values


  todosLosProyectos: any[] = [];  // todos los del JSON
  proyectosVisibles: any[] = []; // filtrados

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
    const navegadorLang = navigator.language || (navigator as any).userLanguage; // ej. 'en-US' o 'es-MX'

    const esEspanol = navegadorLang.toLowerCase().startsWith('es');
    const idioma = esEspanol ? 'es' : 'en';
    this.translate.use(idioma); // Establece el idioma de la app
    this.seoService.setPortfolioPage();
    if (this.translate.currentLang === 'es') {
      this.portfolioService.obtenerProyectosPorIdioma('es').subscribe(data => {
        this.todosLosProyectos = data;
        this.proyectosVisibles = this.todosLosProyectos;
      });
    } else {
      this.portfolioService.obtenerProyectosPorIdioma('en').subscribe(data => {
        this.todosLosProyectos = data;
        this.proyectosVisibles = this.todosLosProyectos;
      });
    }
    
    // 2. Conservamos tu lógica para detectar y establecer el idioma
   

    // 3. Cargamos los datos según el idioma (tu lógica) y luego procesamos con la nueva lógica
    this.portfolioService.obtenerProyectosPorIdioma(idioma).subscribe(data => {
      this.allProjects = data.map((p: any) => ({
        ...p,
        enlaceDemo: p.enlaceDemo === null ? undefined : p.enlaceDemo
      })); // Guardamos los datos en nuestra nueva propiedad, corrigiendo enlaceDemo
      this.filteredProjects = this.allProjects; // Inicialmente, mostramos todos los proyectos
      this.extractCategories(); // Extraemos dinámicamente las categorías
    });
  }

  filtrar(filterKey: string): void {
    this.filtroActivo = filterKey; // Store the key directly

    if (filterKey === 'all') {
      this.proyectosVisibles = this.todosLosProyectos;
    } else {
      this.proyectosVisibles = this.todosLosProyectos.filter(p => {
        // You need to ensure that 'p.sector' in your JSON matches the translated value of the filter key
        // in the CURRENT language. This is the most robust way to handle it.
        const translatedFilterValue = this.translate.instant('portfolio.filters.' + filterKey);
        return p.sector === translatedFilterValue;
      });
    }
  }

  // --- MÉTODOS MEJORADOS ---

  /**
   * Extrae dinámicamente las categorías únicas de los proyectos cargados.
   * Esto es más robusto que tener una lista hardcodeada.
   */
  private extractCategories(): void {
    const categorySet = new Set<string>();
    this.allProjects.forEach(project => categorySet.add(project.sector|| 'all')); // Usa 'all' como valor por defecto si no hay categoría
    this.categories = [...categorySet];
  }

  /**
   * Nueva función de filtrado. Es llamada desde el HTML.
   * Filtra los proyectos basándose en la clave de la categoría (insensible al idioma).
   * @param categoryKey La clave de la categoría (ej: 'education'), o null para "Todos".
   */
  filterByCategory(categoryKey: string | null): void {
    this.selectedCategory = categoryKey; // Actualiza la categoría activa para el estilo del botón

    if (!categoryKey || categoryKey === 'all') {
      this.filteredProjects = this.allProjects;
    } else {
      // Filtramos usando la propiedad 'category' del modelo, que no depende del idioma.
      this.filteredProjects = this.allProjects.filter(
        (project) => project.sector === categoryKey
      );
    }
  }

}