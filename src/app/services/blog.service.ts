import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Post } from '../models/post.model';
import { GET_BLOG } from '../graphql/graphql.queries';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly dataUrl = 'assets/data/blog.data.json';

  constructor(
    private apollo: Apollo,
    private readonly http: HttpClient,
    private readonly translateService: TranslateService
  ) {}

   getPosts(): Observable<Post[]> {
    const currentLang = this.translateService.currentLang || 'es';
    return this.apollo.watchQuery<any>({
      query: GET_BLOG,
      variables: {
        language: currentLang,
      }
    }).valueChanges.pipe(
      map(result => result.data.blog)
    );
  }

  getPostById(id: string): Observable<Post | undefined> {
    return this.getPosts().pipe(
      map(posts => posts.find(p => p.id === +id))
    );
  }
}