import { Component, OnInit } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';
import { BlogService } from 'src/app/services/blog.service';
import { Post } from 'src/app/models/post.model';
import { SeoService } from 'src/app/services/seo.service';

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
export class BlogComponent implements OnInit {
  posts: Post[] = [];

  constructor(private blogService: BlogService, private seoService: SeoService) {}

  ngOnInit(): void {
        this.seoService.setBlogPage();
    this.blogService.getPosts().subscribe(data => this.posts = data);
  }
}