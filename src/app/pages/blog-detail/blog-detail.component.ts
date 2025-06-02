import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { BlogService } from 'src/app/services/blog.service';
import { SeoService } from 'src/app/services/seo.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit, OnDestroy {
  post!: Post | undefined;
  postNotFound = false;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private blogService: BlogService,
    private seoService: SeoService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPost(id);
    } else {
      this.postNotFound = true;
    }

    // Recargar post cuando cambia el idioma
    this.translateService.onLangChange
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const currentId = this.route.snapshot.paramMap.get('id');
        if (currentId) {
          this.loadPost(currentId);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadPost(id: string): void {
    this.blogService.getPostById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (post) => {
          if (post) {
            this.post = post;
            this.postNotFound = false;
            this.updateSEO(post);
          } else {
            this.postNotFound = true;
          }
        },
        error: () => {
          this.postNotFound = true;
        }
      });
  }

  private updateSEO(post: Post): void {
    this.seoService.setBlogDetailPage(post.title, post.image);
  }

  goBack(): void {
    this.location.back();
  }

  sharePost(): void {
    if (navigator.share && this.post) {
      navigator.share({
        title: this.post.title,
        text: this.post.excerpt,
        url: window.location.href
      }).catch(console.error);
    } else {
      // Fallback: copiar URL al portapapeles
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          // Aquí podrías mostrar un toast/notification
          console.log('URL copiada al portapapeles');
        })
        .catch(console.error);
    }
  }
}