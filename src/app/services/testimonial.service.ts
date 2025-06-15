import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { GET_ALL_TESTIMONIALS } from '../graphql/graphql.queries';

export interface Testimonial {
  nombre: string;
  estrellas: number;
  proyecto: string;
  avatar: string;
  comentario: string;
}

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  constructor(private apollo: Apollo) { }

  getTestimonials(): Observable<Testimonial[]> {
    return this.apollo.watchQuery<any>({
      query: GET_ALL_TESTIMONIALS
    }).valueChanges.pipe(
      map(result => result.data.testimonials)
    );
  }
}