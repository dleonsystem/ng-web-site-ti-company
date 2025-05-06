import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Servicio {
  nombre: string;
  descripcion: string;
  icono: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  private url = 'assets/data/services.data.json';

  constructor(private http: HttpClient) {}

  obtenerServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.url);
  }
}
