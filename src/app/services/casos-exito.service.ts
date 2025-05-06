import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CASOS_EXITO } from './casos-exito.data';

@Injectable({
  providedIn: 'root'
})
export class CasosExitoService {
  obtenerCasos(): Observable<typeof CASOS_EXITO> {
    return of(CASOS_EXITO);
  }
}
