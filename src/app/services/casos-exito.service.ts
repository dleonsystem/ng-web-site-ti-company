import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CasosExitoService {

  private dataUrl = 'assets/data/succesCases.data.json';

  constructor(private http: HttpClient) { }

  obtenerCasos(): Observable<any[]> {
    return this.http.get<any[]>(this.dataUrl);
  }
}
