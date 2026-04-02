# Blog Retro 90's - Mejorado ✨

Un blog retro completamente escalable y modular con arquitectura moderna y soporte para **Markdown**.

## 🎯 Lo que cambió

✅ **Componentes reutilizables** - Sin duplicación de código  
✅ **Sistema de datos centralizado** - Gestión en `data.json`  
✅ **Posts en Markdown** - Escribe contenido como `.md`, no JSON  
✅ **JavaScript dinámico** - Las páginas se generan automáticamente  
✅ **Fácil de escalar** - Agregar 100 posts sin problemas  
✅ **Guestbook funcional** - Usa localStorage  
✅ **Conversión automática** - Markdown → HTML en tiempo real  

---

## 🚀 Guía Rápida

### Agregar un nuevo post (Super Fácil!)

**3 pasos simples:**

1. **Edita `data.json`** y agrega la entrada de metadatos:
```json
{
  "id": "mi-post",
  "title": "Mi Nuevo Post",
  "slug": "mi-post",
  "date": "March 29, 2026",
  "excerpt": "Breve resumen del post..."
}
```

2. **Copia `posts/TEMPLATE.md`** a `posts/mi-post.md`

3. **Edita el archivo `.md`** con tu contenido en Markdown

**¡Listo!** ✅ El post aparecerá automáticamente en todas partes:
- Página principal (`index.html`)
- Listado de posts (`posts.html`)
- Archives por fecha (`archives.html`)
- Acceso directo: `/post.html?id=mi-post`

### Ejemplo de contenido Markdown

```markdown
# Título de mi post

Esta es la introducción.

## Primera sección

Contenido con **negritas**, *cursivas*, `código`, etc.

### Subsección

- Lista 1
- Lista 2
- Lista 3

## Segunda sección

Más contenido aquí.
```

**Soporta:**
- Titulos (#, ##, ###, etc)
- Negritas, cursivas, tachado
- Listas ordenadas y desordenadas
- Bloques de código
- Tablas
- Citas (blockquotes)
- Enlaces e imágenes

### Cambiar la navegación

Edita `data.json`:
```json
"navigation": [
  { "label": "inicio", "href": "/" },
  { "label": "posts", "href": "/posts.html" },
  { "label": "acerca de", "href": "/about.html" }
]
```

### Personalizar autor

En `data.json`, edita la sección `blog`:
```json
"blog": {
  "title": "mi-titulo",
  "author": "mi-nombre",
  "avatar": "/images/mi-foto.jpg",
  "description": "mi-descripcion"
}
```

---

## 📁 Estructura de Carpetas

```
90s_website_blog/
├── index.html              # Página principal
├── about.html              # Página Acerca de
├── guestbook.html          # Libro de visitas
├── post.html               # Visor universal de posts
├── posts.html              # Listado de posts
├── archives.html           # Posts por fecha
├── data.json               # Metadatos y configuración ⭐
├── components/             # Componentes HTML reutilizables
│   ├── header.html
│   ├── about-widget.html
│   ├── follow-widget.html
│   └── links-widget.html
├── css/
│   ├── styles.css          # Estilos principales
│   └── components.css      # Estilos de componentes
├── images/                 # Tus imágenes aquí
├── js/
│   └── app.js              # Lógica de componentes
└── posts/                  # Tu contenido en Markdown ⭐
    ├── gadgets2024.md      # Posts como archivos .md
    ├── recycle.md
    ├── win95.md
    └── TEMPLATE.md         # Plantilla para nuevos posts
```

---

## ✨ Características

- ✅ Componentes HTML reutilizables
- ✅ Gestión centralizada en `data.json`
- ✅ **Posts en Markdown** (mucho más fácil que JSON)
- ✅ Conversión automática Markdown → HTML
- ✅ Generación dinámica de páginas
- ✅ Escalable a cientos de posts
- ✅ localStorage para guestbook
- ✅ **Sin dependencias externas** (showdown.js desde CDN)
- ✅ **Sin herramientas de compilación requeridas**
- ✅ Diseño retro 90's preservado

---

## 🏗️ Arquitectura

```
Post files (.md)
        ↓
    post.html
        ↓
showdown.js (Markdown → HTML)
        ↓
HTML renderizado en navegador
        ↓
data.json (para metadatos)
        ↓
js/app.js (componentes dinámicos)
```

---

## 📊 Comparación: Antes vs Después

| Aspecto | Antes | Ahora |
|---------|-------|-------|
| **Cómo escribir posts** | JSON (complicado) | Markdown (natural) |
| **Archivo del post** | `.html` (100+ lineas) | `.md` (puro contenido) |
| **Agregar post nuevo** | HTML + JSON actualizar | Solo `.md` + datos JSON |
| **Editar contenido** | Escaping de caracteres | Escritura normal |
| **Control de cambios** | Difícil en git | Fácil en git |
| **Tamaño de archivos** | Grande | Compacto |

---

## 🎓 Tecnología Usada

- **Markdown**: Lenguaje de formateo simple
- **Showdown.js**: Convierte Markdown → HTML (desde CDN)
- **HTML/CSS/JavaScript**: Frontend puro, sin frameworks
- **Fetch API**: Carga dinámica de archivos
- **localStorage**: Persistencia del guestbook

**¡Cero dependencias locales! Todo desde CDN.**

---

## 📚 Documentación Completa

Ver [ARCHITECTURE.md](ARCHITECTURE.md) para detalles técnicos completos.

---

**¡Ahora tu blog es profesional, escalable y fácil de mantener! 🎊**

# CÓMO LEVANTAR EL PROYECTO
http-server -p 8080