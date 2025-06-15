import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpClient } from '@angular/common/http';
import { GET_ALL_PORTFOLIO } from '../graphql/graphql.queries';
import { Observable, map } from 'rxjs';
// Interface para definir la estructura de un proyecto
export interface Proyecto {
  titulo: string;
  descripcion: string;
  imagen: string;
  sector: string;
  enlaceDemo: string | null;
}

// Interface para la estructura completa del JSON
export interface PortfolioData {
  es: Proyecto[];
  en: Proyecto[];
}
@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private dataUrl = 'assets/data/portfolio.data.json';

  constructor(private http: HttpClient, private apollo: Apollo) { }

  obtenerProyectos(): Observable<any[]> {
    return this.http.get<any[]>(this.dataUrl);
  }
  // Método original que obtiene todos los datos
  obtenerDatosCompletos(): Observable<PortfolioData> {
    return this.http.get<PortfolioData>(this.dataUrl);
  }
    // Método para obtener proyectos filtrados por idioma
   obtenerProyectosPorIdioma(idioma: 'es' | 'en'): Observable<Proyecto[]> {
    return this.apollo.watchQuery<any>({
      query: GET_ALL_PORTFOLIO,
      variables: {
        language: idioma,
      },
    }).valueChanges.pipe(map(result => result.data.portfolio));
  }

  // Método para obtener proyectos por idioma y sector
  obtenerProyectosPorIdiomaYSector(idioma: 'es' | 'en', sector?: string): Observable<Proyecto[]> {
    return this.http.get<PortfolioData>(this.dataUrl).pipe(
      map(data => {
        const proyectos = data[idioma] || [];
        if (sector) {
          return proyectos.filter(proyecto => proyecto.sector === sector);
        }
        return proyectos;
      })
    );
  }

  // Método para obtener todos los sectores únicos por idioma
  obtenerSectoresPorIdioma(idioma: 'es' | 'en'): Observable<string[]> {
    return this.http.get<PortfolioData>(this.dataUrl).pipe(
      map(data => {
        const proyectos = data[idioma] || [];
        const sectores = proyectos.map(proyecto => proyecto.sector);
        return [...new Set(sectores)]; // Eliminar duplicados
      })
    );
  }

  // Método para obtener proyectos con demos disponibles
  obtenerProyectosConDemo(idioma: 'es' | 'en'): Observable<Proyecto[]> {
    return this.http.get<PortfolioData>(this.dataUrl).pipe(
      map(data => {
        const proyectos = data[idioma] || [];
        return proyectos.filter(proyecto => proyecto.enlaceDemo !== null);
      })
    );
  }
}
