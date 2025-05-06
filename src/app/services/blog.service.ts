import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Post } from '../models/post.model';


@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private dataUrl = 'assets/data/blog.data.json';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.dataUrl);
  }

  getPostById(id: string): Observable<Post | undefined> {
    return this.getPosts().pipe(map(posts => posts.find(p => p.id === +id)));
  }
}
