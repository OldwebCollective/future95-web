# 90's Tech Blog - Mejorado ✨

Un blog retro completamente escalable y modular con arquitectura moderna.

## 🎯 Lo que cambió

✅ **Componentes reutilizables** - Sin duplicación de código  
✅ **Sistema de datos centralizado** - Gestión fácil de posts en `data.json`  
✅ **JavaScript dinámico** - Las páginas se generan automáticamente  
✅ **Fácil de escalar** - Agregar 100 posts requiere cambios mínimos  
✅ **Guestbook funcional** - Usa localStorage para guardar mensajes  
✅ **Páginas completas** - about.html y guestbook.html ya están listos  

---

## 🚀 Guía Rápida

### Agregar un nuevo post

**1. Edita `data.json`** y agrega tu post:
```json
{
  "id": "mi-post",
  "title": "Mi Nuevo Post",
  "slug": "mi-post",
  "date": "March 29, 2026",
  "excerpt": "Resumen corto...",
  "file": "posts/mi-post.html"
}
```

**2. Copia `posts/TEMPLATE.html`** a `posts/mi-post.html`

**3. Edita el contenido** - ¡Listo! 🎉

El post aparecerá automáticamente en la página principal.

### Cambiar la navegación

Edita los `navigation` links en `data.json`:
```json
"navigation": [
  { "label": "home", "href": "index.html" },
  { "label": "mi-nueva-página", "href": "nueva.html" }
]
```

### Personalizar autor

En `data.json`, edita `blog`:
```json
"blog": {
  "title": "mi-titulo",
  "author": "mi-nombre",
  "avatar": "images/mi-foto.jpg",
  "description": "mi-descripcion"
}
```

---

## 📁 Archivos Importantes

| Archivo | Propósito |
|---------|-----------|
| `data.json` | Centro de control - todos los datos |
| `js/app.js` | Lógica de inyección de componentes |
| `components/` | Partes reutilizables del sitio |
| `css/styles.css` | Estilos principales |
| `css/components.css` | Estilos de componentes |

---

## 🏗️ Arquitectura

```
user pages (index.html, about.html, etc)
         ↓
    js/app.js (inyecta componentes)
         ↓
components/ (header, widgets, etc)
         ↓
data.json (controla todo - posts, nav, autor)
         ↓
css/ (estilos modular)
```

---

## 📚 Documentación Completa

Ver [ARCHITECTURE.md](ARCHITECTURE.md) para detalles técnicos completos.

---

## ✨ Características

- Modern component-based architecture
- Centralized data management
- Dynamic page generation
- Fully scalable to thousands of posts
- localStorage-based guestbook
- No dependencies or build tools needed
- Pure HTML/CSS/JavaScript
- 90's retro UI design preserved

---

**¡Ahora tu blog es profesional y escalable! 🎊**
