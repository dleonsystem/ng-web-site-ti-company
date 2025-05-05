import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly posts: Post[] = [
    {
      id: 1,
      title: 'Inteligencia Artificial en Ciberseguridad',
      image: 'assets/images/blog/detail-ai-cybersecurity.png',
      excerpt: 'Cómo la IA está revolucionando la defensa digital.',
      content: 'Contenido completo del post sobre inteligencia artificial...',
      alt: 'Imagen sobre cómo la inteligencia artificial fortalece la seguridad digital.'

    },
    {
      id: 2,
      title: 'Migración a la Nube',
      image: 'assets/images/blog/detail-cloud-migration.png',
      excerpt: 'Por qué deberías considerar llevar tu empresa a la nube.',
      content: 'Contenido completo del post sobre migración a la nube...',
      alt: 'Imagen sobre guía práctica para mover tu infraestructura de forma segura.'

    },
    {
      id: 3,
      title: 'Software a la Medida',
      image: 'assets/images/blog/detail-custom-software.png',
      excerpt: 'Soluciones diseñadas específicamente para tus procesos.',
      content: 'Contenido completo del post sobre software personalizado...',
      alt: 'Imagen sobre cómo personalizar tus soluciones para escalar con agilidad'
    }
  ];

  getPostById(id: number): Post | undefined {
    return this.posts.find(p => p.id === id);
  }
  getPosts(): Post[] {
    return this.posts;
  }
  getAllPosts(): Post[] {
    return this.posts;
  }
}
