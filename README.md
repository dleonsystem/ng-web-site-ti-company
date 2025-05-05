# 🌐 Lion Systems - Corporate Website (Angular)

Este es el sitio web empresarial de **Lion Systems**, desarrollado en Angular. Ofrece información sobre los servicios de la compañía en desarrollo de software, inteligencia artificial, ciberseguridad y soluciones en la nube.

---

## 🚀 Características principales

- Diseño profesional y moderno con Angular + Angular Material + Bootstrap.
- Navegación SPA (Single Page Application).
- Traducción automática basada en el idioma del navegador.
- Soporte completo para **español** e **inglés**.
- Formulario de contacto funcional con validaciones.
- Preparado para despliegue en **Netlify**.

---

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── components/
│   ├── pages/
│   ├── shared/
│   └── app.module.ts
├── assets/
│   └── i18n/
│       ├── en.json
│       └── es.json
├── environments/
└── index.html
```

---

## 🌍 Internacionalización (i18n)

Este proyecto incluye soporte para múltiples idiomas usando [`@ngx-translate/core`](https://github.com/ngx-translate/core).

### Idiomas disponibles

- Español (`es`)
- Inglés (`en`)

### Detección automática

Al cargar el sitio, se detecta automáticamente el idioma preferido del navegador y la región geográfica:

- Si el navegador está en **español** o la región es **México**, se muestra la interfaz en **español**.
- En cualquier otro caso, se presenta la versión en **inglés**.

### Estructura de archivos de traducción

Los archivos de traducción se encuentran en:

```
/src/assets/i18n/es.json
/src/assets/i18n/en.json
```

Cada archivo contiene las claves y valores utilizados por el sistema de traducción, organizados por secciones de la interfaz (navbar, home, about, contact, etc.).

### Uso en componentes

Para traducir textos, se usa el pipe `translate`:

```html
<h1>{{ 'home.title' | translate }}</h1>
```

O bien desde TypeScript:

```ts
this.translateService.get('navbar.contact').subscribe((text) => {
  console.log(text); // "Contacto" o "Contact"
});
```

---

## 📦 Despliegue en Netlify

1. El proyecto se despliega automáticamente con cada `push` a la rama principal (`master` o `main`).
2. Asegúrate de tener este archivo en la raíz:

```
netlify.toml
```

Con el contenido:

```toml
[build]
  command = "npm run build"
  publish = "dist/ng-web-site-ti-company"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 🛠️ Scripts útiles

```bash
npm install          # Instala dependencias
ng serve             # Servidor local en http://localhost:4200
ng build --prod      # Compila para producción
```

---

## 📄 Licencia

Desarrollado para Lion Systems © 2025.