# 📄 Changelog

Todas las versiones siguen la convención de versionado semántico (semver.org).

---

## [0.0.4] - 2025-05-05
### Added
- Envío de mensajes desde el formulario de contacto vía EmailJS
- Validaciones de campos de nombre, correo y mensaje
- Indicadores visuales con `MatProgressSpinner` y `MatSnackBar`
- Integración completa de `ngx-translate` en formulario de contacto

### Fixed
- Error 422 de EmailJS por campo `email` ausente en `templateParams`

### Changed
- Migración de etiquetas `i18n` a `ngx-translate` en `contact.component.html`

---

## [0.0.2] - 2025-05-05

### ✨ Added
- Soporte completo de internacionalización (i18n) usando `@ngx-translate/core`.
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

