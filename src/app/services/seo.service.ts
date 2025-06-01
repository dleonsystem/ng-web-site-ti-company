// src/app/services/seo.service.ts
import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private defaultImage = '/assets/images/lion-systems-og.jpg';
  private defaultDescription = 'Lion Systems - Soluciones tecnológicas innovadoras para empresas. Desarrollo web, aplicaciones móviles, consultoría TI y transformación digital.';
  private baseUrl = 'https://lionsystems.com.mx'; // Cambiar por tu dominio

  constructor(
    private title: Title,
    private meta: Meta
  ) {}

  updateSEO(data: SEOData): void {
    // Actualizar título
    this.title.setTitle(data.title);

    // Meta tags básicos
    this.updateOrCreateTag('description', data.description);
    this.updateOrCreateTag('keywords', data.keywords || 'desarrollo web, aplicaciones móviles, consultoría TI, Lion Systems, tecnología, México');
    this.updateOrCreateTag('author', data.author || 'Lion Systems');

    // Open Graph (Facebook, LinkedIn, etc.)
    this.updateOrCreateTag('og:title', data.title, 'property');
    this.updateOrCreateTag('og:description', data.description, 'property');
    this.updateOrCreateTag('og:image', data.image || this.defaultImage, 'property');
    this.updateOrCreateTag('og:url', data.url || this.baseUrl, 'property');
    this.updateOrCreateTag('og:type', data.type || 'website', 'property');
    this.updateOrCreateTag('og:site_name', 'Lion Systems', 'property');

    // Twitter Cards
    this.updateOrCreateTag('twitter:card', 'summary_large_image', 'name');
    this.updateOrCreateTag('twitter:title', data.title, 'name');
    this.updateOrCreateTag('twitter:description', data.description, 'name');
    this.updateOrCreateTag('twitter:image', data.image || this.defaultImage, 'name');
    this.updateOrCreateTag('twitter:site', '@LionSystemsMX', 'name'); // Cambiar por tu handle

    // Article meta tags (para blog)
    if (data.publishedTime) {
      this.updateOrCreateTag('article:published_time', data.publishedTime, 'property');
    }
    if (data.modifiedTime) {
      this.updateOrCreateTag('article:modified_time', data.modifiedTime, 'property');
    }

    // Schema.org JSON-LD
    this.updateJsonLd(data);
  }

  private updateOrCreateTag(name: string, content: string, attribute: string = 'name'): void {
    if (content) {
      if (this.meta.getTag(`${attribute}="${name}"`)) {
        this.meta.updateTag({ [attribute]: name, content });
      } else {
        this.meta.addTag({ [attribute]: name, content });
      }
    }
  }

  private updateJsonLd(data: SEOData): void {
    // Remover JSON-LD previo
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Crear nuevo JSON-LD
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": data.type === 'article' ? 'Article' : 'WebPage',
      "name": data.title,
      "description": data.description,
      "url": data.url || this.baseUrl,
      "image": data.image || this.defaultImage,
      "publisher": {
        "@type": "Organization",
        "name": "Lion Systems",
        "logo": {
          "@type": "ImageObject",
          "url": `${this.baseUrl}/assets/images/logo-lion-systems.png`
        }
      },
      ...(data.publishedTime && {
        "datePublished": data.publishedTime,
        "dateModified": data.modifiedTime || data.publishedTime
      })
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);
  }

  // Configuraciones específicas por página
  setHomePage(): void {
    this.updateSEO({
      title: 'Lion Systems - Soluciones Tecnológicas Innovadoras',
      description: 'Transformamos ideas en soluciones digitales. Desarrollo web, aplicaciones móviles, consultoría TI y servicios de nube. Más de 5 años de experiencia en México.',
      keywords: 'desarrollo web México, aplicaciones móviles, consultoría TI, transformación digital, Lion Systems',
      url: this.baseUrl
    });
  }

  setAboutPage(): void {
    this.updateSEO({
      title: 'Nosotros - Equipo Lion Systems | Expertos en Tecnología',
      description: 'Conoce al equipo detrás de Lion Systems. Profesionales especializados en desarrollo de software, consultoría tecnológica y transformación digital.',
      keywords: 'equipo Lion Systems, desarrolladores México, consultoría tecnológica, empresa TI',
      url: `${this.baseUrl}/nosotros`
    });
  }

  setServicesPage(): void {
    this.updateSEO({
      title: 'Servicios TI - Desarrollo Web y Aplicaciones | Lion Systems',
      description: 'Servicios especializados: Desarrollo web, aplicaciones móviles, consultoría TI, migración a la nube, automatización de procesos y soporte técnico.',
      keywords: 'servicios TI México, desarrollo web, aplicaciones móviles, consultoría tecnológica, migración nube',
      url: `${this.baseUrl}/servicios`
    });
  }

  setContactPage(): void {
    this.updateSEO({
      title: 'Contacto - Lion Systems | Solicita tu Cotización Gratuita',
      description: 'Contáctanos para tu proyecto tecnológico. Cotización gratuita, asesoría personalizada. Oficinas en Ciudad de México.',
      keywords: 'contacto Lion Systems, cotización desarrollo web, asesoría tecnológica México',
      url: `${this.baseUrl}/contacto`
    });
  }

  setBlogPage(): void {
    this.updateSEO({
      title: 'Blog Tecnológico - Lion Systems | Tendencias y Tutoriales',
      description: 'Artículos sobre desarrollo web, tecnologías emergentes, mejores prácticas y tendencias del sector tecnológico.',
      keywords: 'blog tecnología, desarrollo web, programación, tendencias TI, tutoriales',
      url: `${this.baseUrl}/blog`
    });
  }

  setBlogDetailPage(article: any): void {
    this.updateSEO({
      title: `${article.title} | Blog Lion Systems`,
      description: article.excerpt || article.description,
      keywords: article.tags?.join(', ') || 'desarrollo web, tecnología, programación',
      image: article.image,
      url: `${this.baseUrl}/blog/${article.id}`,
      type: 'article',
      author: article.author || 'Lion Systems',
      publishedTime: article.publishedDate,
      modifiedTime: article.modifiedDate
    });
  }

  setCasosExitoPage(): void {
    this.updateSEO({
      title: 'Casos de Éxito - Proyectos Lion Systems | Portfolio',
      description: 'Descubre nuestros casos de éxito más destacados. Proyectos reales de desarrollo web, aplicaciones móviles y consultoría TI.',
      keywords: 'casos éxito Lion Systems, portfolio desarrollo web, proyectos TI México',
      url: `${this.baseUrl}/casos-exito`
    });
  }

  setPortfolioPage(): void {
    this.updateSEO({
      title: 'Portafolio - Trabajos Destacados | Lion Systems',
      description: 'Explora nuestro portafolio de proyectos. Sitios web, aplicaciones móviles y soluciones empresariales desarrolladas por Lion Systems.',
      keywords: 'portafolio Lion Systems, trabajos desarrollo web, proyectos aplicaciones móviles',
      url: `${this.baseUrl}/portafolio`
    });
  }

  // Método para limpiar meta tags cuando se navega
  clearSEO(): void {
    const tagsToRemove = [
      'description', 'keywords', 'author',
      'og:title', 'og:description', 'og:image', 'og:url', 'og:type',
      'twitter:title', 'twitter:description', 'twitter:image',
      'article:published_time', 'article:modified_time'
    ];

    tagsToRemove.forEach(tag => {
      const element = this.meta.getTag(`name="${tag}"`) || this.meta.getTag(`property="${tag}"`);
      if (element) {
        this.meta.removeTagElement(element);
      }
    });
  }
}