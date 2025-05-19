# 📄 Changelog

Todas las versiones siguen la convención de versionado semántico (semver.org).

## [v0.0.6] - 2025-05-18

### Added
- Se agregó un botón de contacto flotante (sticky FAB) visible en todo el sitio
  - Estilizado con Angular Material (`mat-icon`) y diseño responsivo
  - Ubicado en la esquina inferior derecha
  - Redirige a `/contacto`
  - Incluye soporte de accesibilidad (`aria-label="Contacto"`)

### Modified
- Archivos modificados: `app.component.html`, `app.component.scss`

### Validated
- Validado en escritorio y móvil
- Confirmado en navegación real de usuario
- Cumple criterios de usabilidad, accesibilidad y visibilidad
### Added
- Reestructuración completa de la sección “Nuestros Servicios” con enfoque en monetización.
  - Se agregaron tarjetas por servicio: API GraphQL, Apps móviles, Dashboards, Migración cloud, etc.
  - Cada tarjeta incluye ícono, descripción, precio base y botón “Solicitar cotización”
  - Se implementó navegación a `/contacto?servicio=...` desde cada botón
  - Se agregó tracking personalizado de clics por servicio usando Google Analytics 4

### Modified
- Archivos afectados: `home.component.html`, `home.component.ts`, `es.json`, `home.component.scss`
- Se refactorizó función `trackCotizacion()` para manejar navegación y eventos

### Validated
- Validado en entorno local y producción
- Confirmado seguimiento en GA4 por evento `click` con categoría `Cotización`
- Navegación verificada sin errores
### Added
- Se agregó un **Call To Action (CTA)** comercial y visible en la sección principal (`hero`) de la página de inicio.
  - Mensaje de valor visible: “¿Necesitas ayuda tecnológica segura y escalable?”
  - Botón de acción: “Solicita una consultoría gratuita”
  - Enlace funcional al formulario de contacto (`/contacto`)
  - Implementación de tracking de evento personalizado usando Google Analytics 4 (GA4)

### Modified
- Archivos afectados: `home.component.html`, `home.component.ts`, `home.component.scss`, `es.json`, `index.html`
- Se mejoró la semántica de encabezados y accesibilidad visual del CTA
- Se internacionalizó el texto del CTA para soporte multilenguaje

### Validated
- Validación en entorno de producción completada
- Confirmación de detección del evento personalizado en consola de Google Analytics
- Verificado en navegadores de escritorio y móviles

### Agregado
- Sección de Portafolio / Proyectos integrada con estructura desacoplada usando servicio y JSON.
- Imágenes generadas con IA para representar visualmente cada sistema (resolución 1500x1000 px, estilo profesional).
- Servicio `proyectos.service.ts` para consumo de datos de portafolio.
- Vista del componente portafolio con diseño responsivo y tarjetas con íconos centrados.

### Corregido
- Problema de alineación de íconos en componentes `home`, `services`, y `about`.

### Mejorado
- Separación de datos y presentación en componentes.
- Estilos unificados para tarjetas de servicios.


## [0.0.5] - 2025-05-05

### ✨ Added
- Componente `Casos de Éxito` con datos cargados desde servicio en formato JSON.
- Diseño adaptado con badges, íconos y estructura compatible con estilo de página principal.
- Modelo `CasoExito` en archivo separado para mantener estructura modular.
- Página de `Aviso de Privacidad` con contenido institucional y estructura legal básica.
- Ruta `/aviso-privacidad` integrada a `AppRoutingModule`.
- Entrada `Aviso de Privacidad` añadida al `navbar` con traducción en `es.json` y `en.json`.

### 🎨 Improved
- Estilos SCSS de `casos-exito.component` integrados con paleta institucional (azul, turquesa, sombras suaves).
- Diseño responsive y coherente con secciones como `home` y `servicios`.

---

## [0.0.4] - 2025-05-05
### Added
- Envío de mensajes desde el formulario de contacto vía EmailJS
- Validaciones de campos de nombre, correo y mensaje
- Indicadores visuales con `MatProgressSpinner` y `MatSnackBar`
- Integración completa de `ngx-translate` en formulario de contacto

### Fixed
- Error 422 de EmailJS por campo `email` ausente en `templateParams`

---

## [0.0.2] - 2025-05-05

### ✨ Added
- Archivos de traducción `en.json` y `es.json` organizados por sección.
- Detección automática del idioma del navegador y región (`es-MX`) para mostrar inglés o español.
- Uso del pipe `translate` en componentes como navbar, home, servicios y contacto.
- Mensajes de formulario traducidos y validaciones localizadas.
- Documentación actualizada en `README.md` sobre traducción y despliegue en Netlify.

---

## [0.0.1] - 2025-05-01

### 🚀 Added
- Estructura inicial del sitio en Angular 17 con Angular Material y Bootstrap.
- Componentes: Home, Nosotros, Servicios, Contacto.
- Formulario funcional de contacto con validaciones.
- Estilo empresarial personalizado (navbar, secciones, tipografía).
- Soporte de despliegue automático en Netlify con `netlify.toml` y reglas de redirección SPA.

