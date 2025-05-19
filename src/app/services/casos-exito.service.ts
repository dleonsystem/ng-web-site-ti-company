import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CasosExitoService {

  private dataUrl = 'assets/data/succesCases.data.json';
  sucessCases: any[] = [];;

  constructor(private http: HttpClient) { }

  obtenerCasoPorId(id: string): Observable<any | undefined> {
    return this.obtenerCasos().pipe(
      map(casos => casos.find(caso => this.toId(caso.nombre) === id))
    );
  }
  obtenerCasos(): Observable<any[]> {
    return this.http.get<any[]>(this.dataUrl);
  }
  obtenerCasoPorClave(clave: string): any {
    console.log(clave);
    return this.obtenerCasos().pipe(
      map(casos => casos.find(c => c.clave === clave))
    );

  }
  private toId(nombre: string): string {
    return nombre.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
  }
}
