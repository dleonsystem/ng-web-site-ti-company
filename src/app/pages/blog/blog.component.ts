import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';
import { Subject, takeUntil } from 'rxjs';
import { BlogService } from 'src/app/services/blog.service';
import { Post } from 'src/app/models/post.model';
import { SeoService } from 'src/app/services/seo.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        query('.card', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('500ms ease-out', style({ opacity: 1, transform: 'none' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class BlogComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private blogService: BlogService, 
    private seoService: SeoService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.seoService.setBlogPage();
    this.loadPosts();

    // Recargar posts cuando cambia el idioma
    this.translateService.onLangChange
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.loadPosts();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadPosts(): void {
    this.blogService.getPosts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => this.posts = data,
        error: (error) => {
          console.error('Error loading posts:', error);
          this.posts = [];
        }
      });
  }
}