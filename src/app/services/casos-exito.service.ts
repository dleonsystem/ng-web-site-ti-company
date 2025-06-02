import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root'
})
export class CasosExitoService {

  private readonly dataUrl = 'assets/data/succesCases.data.json';
  sucessCases: any[] = [];;

  constructor(private readonly http: HttpClient, private readonly translate: TranslateService) { }

  obtenerCasoPorId(id: string): Observable<any | undefined> {
    return this.obtenerCasos().pipe(
      map(casos => casos.find(caso => this.toId(caso.nombre) === id))
    );
  }
  obtenerCasos(): Observable<any[]> {
    return this.http.get<any>(this.dataUrl).pipe(
      map(data => {
        const currentLang = this.translate.currentLang || 'es';
        return data[currentLang] || data['es']; // Fallback a español si no existe el idioma
      })
    );
  }
  obtenerCasoPorClave(clave: string): any {
    console.log(clave);
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
