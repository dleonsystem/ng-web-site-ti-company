import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { GET_ALL_SERVICES } from '../graphql/graphql.queries';
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

  constructor(private apollo: Apollo, private http: HttpClient) { }

  obtenerServicios(idioma: 'es' | 'en' = 'es'): Observable<Servicio[]> {
    console.log('obtenerServicios called with language:', idioma);
    return this.apollo.watchQuery<any>({
      query: GET_ALL_SERVICES,
      variables: {
        language: idioma
      }
    }).valueChanges.pipe(
      map(result => {
        // Flatten the structure to match the existing model if needed
        return result.data.services.categorias.map((cat: any) => ({
          nombre: cat.nombre,
          descripcion: cat.descripcion, // You might need to adjust this
          icono: cat.icono,
          precio: cat.precioBase,
          link: cat.link,
          imagen: cat.imagen,
          eventoGA: cat.eventoGA,
        }));
      })
    );
  }
  // Método alternativo para obtener todos los datos si necesitas acceso completo
  obtenerTodosLosServicios(): Observable<ServiciosData> {
    return this.http.get<ServiciosData>(this.url);
  }
}
