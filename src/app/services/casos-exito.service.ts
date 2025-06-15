import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Apollo } from 'apollo-angular';
import { GET_ALL_SUCCESS_CASES } from '../graphql/graphql.queries';

@Injectable({
  providedIn: 'root'
})
export class CasosExitoService {

  private readonly dataUrl = 'assets/data/succesCases.data.json';
  sucessCases: any[] = [];;

  constructor(private readonly http: HttpClient, private readonly translate: TranslateService, private apollo: Apollo) { }

  obtenerCasoPorId(id: string): Observable<any | undefined> {
    return this.obtenerCasos().pipe(
      map(casos => casos.find(caso => this.toId(caso.nombre) === id))
    );
  }
  
  obtenerCasos(): Observable<any[]> {
    return this.apollo.watchQuery<any>({
      query: GET_ALL_SUCCESS_CASES
    }).valueChanges.pipe(
      map(result => result.data.successCases)
    );
  }

  obtenerCasoPorClave(clave: string): Observable<any | undefined> {
    return this.obtenerCasos().pipe(
      map(casos => casos.find(c => c.clave === clave))
    );
  }

  // Método adicional para obtener casos de un idioma específico
  obtenerCasosPorIdioma(idioma: string = 'es'): Observable<any[]> {
    return this.http.get<any>(this.dataUrl).pipe(
      map(data => data[idioma] || data['es'])
    );
  }

  private toId(nombre: string): string {
    return nombre.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
  }
}
