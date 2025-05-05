import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BlogDetailComponent } from './blog-detail.component';
import { BlogService } from 'src/app/services/blog.service';
import { Post } from 'src/app/models/post.model';

describe('BlogDetailComponent', () => {
  let component: BlogDetailComponent;
  let fixture: ComponentFixture<BlogDetailComponent>;
  let mockBlogService: jasmine.SpyObj<BlogService>;

  const mockPost: Post = {
    id: 1,
    title: 'Test Post',
    excerpt: 'Excerpt',
    content: 'Full content',
    image: 'assets/images/test.png',
    alt: 'Test image'
  };

  beforeEach(async () => {
    const blogServiceSpy = jasmine.createSpyObj('BlogService', ['getPostById']);

    await TestBed.configureTestingModule({
      declarations: [BlogDetailComponent],
      providers: [
        { provide: BlogService, useValue: blogServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '1' } }
          }
        }
      ]
    }).compileComponents();

    mockBlogService = TestBed.inject(BlogService) as jasmine.SpyObj<BlogService>;
    mockBlogService.getPostById.and.returnValue(mockPost);

    fixture = TestBed.createComponent(BlogDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería obtener el post por id al inicializarse', () => {
    expect(mockBlogService.getPostById).toHaveBeenCalledWith(1);
    expect(component.post).toEqual(mockPost);
  });
});
