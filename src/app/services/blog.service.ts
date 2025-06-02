import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly dataUrl = 'assets/data/blog.data.json';

  constructor(
    private readonly http: HttpClient,
    private readonly translateService: TranslateService
  ) {}

  getPosts(): Observable<Post[]> {
    const currentLang = this.translateService.currentLang || 'es';
    return this.http.get<any>(this.dataUrl).pipe(
      map(data => data[currentLang] || data.es)
    );
  }

  getPostById(id: string): Observable<Post | undefined> {
    return this.getPosts().pipe(
      map(posts => posts.find(p => p.id === +id))
    );
  }
}