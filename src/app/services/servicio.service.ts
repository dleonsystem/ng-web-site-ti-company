import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Servicio } from '../models/service.model';

interface ServiciosData {
  es: Servicio[];
  en: Servicio[];
}


@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  private url = 'assets/data/services.data.json';

  constructor(private http: HttpClient) { }

  obtenerServicios(idioma: 'es' | 'en' = 'es'): Observable<Servicio[]> {
    return this.http.get<ServiciosData>(this.url).pipe(
      map(data => data[idioma])
    );
  }
  // Método alternativo para obtener todos los datos si necesitas acceso completo
  obtenerTodosLosServicios(): Observable<ServiciosData> {
    return this.http.get<ServiciosData>(this.url);
  }
}
