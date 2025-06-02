// src/app/services/seo.service.ts
import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

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
  private baseUrl = 'https://lionsystems.com.mx'; // Cambiar por tu dominio

  constructor(
    private title: Title,
    private meta: Meta,
    private translateService: TranslateService
  ) {}

  updateSEO(data: SEOData): void {
    // Actualizar título
    this.title.setTitle(data.title);

    // Meta tags básicos
    this.updateOrCreateTag('description', data.description);
    this.updateOrCreateTag('keywords', data.keywords || this.getDefaultKeywords());
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

  private getDefaultKeywords(): string {
    const currentLang = this.translateService.currentLang || 'es';
    return currentLang === 'en' 
      ? 'web development, mobile apps, IT consulting, Lion Systems, technology, Mexico'
      : 'desarrollo web, aplicaciones móviles, consultoría TI, Lion Systems, tecnología, México';
  }

  private getDefaultDescription(): string {
    const currentLang = this.translateService.currentLang || 'es';
    return currentLang === 'en'
      ? 'Lion Systems - Innovative technological solutions for businesses. Web development, mobile applications, IT consulting and digital transformation.'
      : 'Lion Systems - Soluciones tecnológicas innovadoras para empresas. Desarrollo web, aplicaciones móviles, consultoría TI y transformación digital.';
  }

  // Configuraciones específicas por página
  setHomePage(): void {
    const currentLang = this.translateService.currentLang || 'es';
    
    if (currentLang === 'en') {
      this.updateSEO({
        title: 'Lion Systems - Innovative Technological Solutions',
        description: 'We transform ideas into digital solutions. Web development, mobile applications, IT consulting and cloud services. Over 5 years of experience in Mexico.',
        keywords: 'web development Mexico, mobile applications, IT consulting, digital transformation, Lion Systems',
        url: this.baseUrl
      });
    } else {
      this.updateSEO({
        title: 'Lion Systems - Soluciones Tecnológicas Innovadoras',
        description: 'Transformamos ideas en soluciones digitales. Desarrollo web, aplicaciones móviles, consultoría TI y servicios de nube. Más de 5 años de experiencia en México.',
        keywords: 'desarrollo web México, aplicaciones móviles, consultoría TI, transformación digital, Lion Systems',
        url: this.baseUrl
      });
    }
  }

  setAboutPage(): void {
    const currentLang = this.translateService.currentLang || 'es';
    
    if (currentLang === 'en') {
      this.updateSEO({
        title: 'About Us - Lion Systems Team | Technology Experts',
        description: 'Meet the team behind Lion Systems. Professionals specialized in software development, technology consulting and digital transformation.',
        keywords: 'Lion Systems team, Mexico developers, technology consulting, IT company',
        url: `${this.baseUrl}/about`
      });
    } else {
      this.updateSEO({
        title: 'Nosotros - Equipo Lion Systems | Expertos en Tecnología',
        description: 'Conoce al equipo detrás de Lion Systems. Profesionales especializados en desarrollo de software, consultoría tecnológica y transformación digital.',
        keywords: 'equipo Lion Systems, desarrolladores México, consultoría tecnológica, empresa TI',
        url: `${this.baseUrl}/nosotros`
      });
    }
  }

  setServicesPage(): void {
    const currentLang = this.translateService.currentLang || 'es';
    
    if (currentLang === 'en') {
      this.updateSEO({
        title: 'IT Services - Web Development and Applications | Lion Systems',
        description: 'Specialized services: Web development, mobile applications, IT consulting, cloud migration, process automation and technical support.',
        keywords: 'IT services Mexico, web development, mobile applications, technology consulting, cloud migration',
        url: `${this.baseUrl}/services`
      });
    } else {
      this.updateSEO({
        title: 'Servicios TI - Desarrollo Web y Aplicaciones | Lion Systems',
        description: 'Servicios especializados: Desarrollo web, aplicaciones móviles, consultoría TI, migración a la nube, automatización de procesos y soporte técnico.',
        keywords: 'servicios TI México, desarrollo web, aplicaciones móviles, consultoría tecnológica, migración nube',
        url: `${this.baseUrl}/servicios`
      });
    }
  }

  setContactPage(): void {
    const currentLang = this.translateService.currentLang || 'es';
    
    if (currentLang === 'en') {
      this.updateSEO({
        title: 'Contact - Lion Systems | Request Your Free Quote',
        description: 'Contact us for your technology project. Free quote, personalized advice. Offices in Mexico City.',
        keywords: 'Lion Systems contact, web development quote, technology advice Mexico',
        url: `${this.baseUrl}/contact`
      });
    } else {
      this.updateSEO({
        title: 'Contacto - Lion Systems | Solicita tu Cotización Gratuita',
        description: 'Contáctanos para tu proyecto tecnológico. Cotización gratuita, asesoría personalizada. Oficinas en Ciudad de México.',
        keywords: 'contacto Lion Systems, cotización desarrollo web, asesoría tecnológica México',
        url: `${this.baseUrl}/contacto`
      });
    }
  }

  setBlogPage(): void {
    const currentLang = this.translateService.currentLang || 'es';
    
    if (currentLang === 'en') {
      this.updateSEO({
        title: 'Technology Blog - Lion Systems | Trends and Tutorials',
        description: 'Articles about web development, emerging technologies, best practices and technology sector trends.',
        keywords: 'technology blog, web development, programming, IT trends, tutorials',
        url: `${this.baseUrl}/blog`
      });
    } else {
      this.updateSEO({
        title: 'Blog Tecnológico - Lion Systems | Tendencias y Tutoriales',
        description: 'Artículos sobre desarrollo web, tecnologías emergentes, mejores prácticas y tendencias del sector tecnológico.',
        keywords: 'blog tecnología, desarrollo web, programación, tendencias TI, tutoriales',
        url: `${this.baseUrl}/blog`
      });
    }
  }

  // ⚠️ MÉTODO CORREGIDO - Este era el principal problema
  setBlogDetailPage(title: string, excerpt: string, image?: string, postId?: number): void {
    const currentLang = this.translateService.currentLang || 'es';
    const blogTitle = currentLang === 'en' 
      ? `${title} | Lion Systems Blog`
      : `${title} | Blog Lion Systems`;

    this.updateSEO({
      title: blogTitle,
      description: excerpt,
      keywords: currentLang === 'en' 
        ? 'web development, technology, programming, artificial intelligence, cybersecurity'
        : 'desarrollo web, tecnología, programación, inteligencia artificial, ciberseguridad',
      image: image,
      url: `${this.baseUrl}/blog/${postId}`,
      type: 'article',
      author: 'Lion Systems',
      publishedTime: new Date().toISOString(), // O usar la fecha real del post
      modifiedTime: new Date().toISOString()
    });
  }

  setCasosExitoPage(): void {
    const currentLang = this.translateService.currentLang || 'es';
    
    if (currentLang === 'en') {
      this.updateSEO({
        title: 'Success Stories - Lion Systems Projects | Portfolio',
        description: 'Discover our most outstanding success stories. Real projects in web development, mobile applications and IT consulting.',
        keywords: 'Lion Systems success stories, web development portfolio, IT projects Mexico',
        url: `${this.baseUrl}/success-stories`
      });
    } else {
      this.updateSEO({
        title: 'Casos de Éxito - Proyectos Lion Systems | Portfolio',
        description: 'Descubre nuestros casos de éxito más destacados. Proyectos reales de desarrollo web, aplicaciones móviles y consultoría TI.',
        keywords: 'casos éxito Lion Systems, portfolio desarrollo web, proyectos TI México',
        url: `${this.baseUrl}/casos-exito`
      });
    }
  }

  setPortfolioPage(): void {
    const currentLang = this.translateService.currentLang || 'es';
    
    if (currentLang === 'en') {
      this.updateSEO({
        title: 'Portfolio - Featured Work | Lion Systems',
        description: 'Explore our project portfolio. Websites, mobile applications and business solutions developed by Lion Systems.',
        keywords: 'Lion Systems portfolio, web development work, mobile application projects',
        url: `${this.baseUrl}/portfolio`
      });
    } else {
      this.updateSEO({
        title: 'Portafolio - Trabajos Destacados | Lion Systems',
        description: 'Explora nuestro portafolio de proyectos. Sitios web, aplicaciones móviles y soluciones empresariales desarrolladas por Lion Systems.',
        keywords: 'portafolio Lion Systems, trabajos desarrollo web, proyectos aplicaciones móviles',
        url: `${this.baseUrl}/portafolio`
      });
    }
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