# 📐 Arquitectura del Blog Retro 90's

## Visión General

Este es un **blog estático con arquitectura modular** que combina:
- HTML + CSS para la interfaz retro de los 90's
- JavaScript vanilla para renderización dinámica
- JSON centralizado para gestión de datos
- Markdown para contenido de publicaciones

**Características clave:**
- ✅ Componentes reutilizables
- ✅ Posts en Markdown (no JSON)
- ✅ Renderización automática
- ✅ Sin framework JavaScript pesado
- ✅ Fácil de escalar

---

## 📁 Estructura del Proyecto

```
90s_website_blog/
├── index.html              # Página principal (home)
├── post.html              # Página para leer un post
├── posts.html             # Listado de todos los posts
├── about.html             # Página "Acerca de"
├── archives.html          # Archivo de posts (a desarrollar)
├── guestbook.html         # Guestbook (a desarrollar)
│
├── data.json              # 📌 DATOS CENTRALES (metadatos)
│
├── js/
│   └── app.js            # Lógica principal de la app
│
├── css/
│   ├── styles.css        # Estilos retro
│   └── components.css    # Componentes reutilizables
│
├── components/           # Partes HTML reutilizables
│   ├── header.html
│   ├── about-widget.html
│   ├── follow-widget.html
│   ├── links-widget.html
│   ├── posts-list.html
│   └── sidebar.html
│
├── posts/                # 📌 CONTENIDO DE POSTS (Markdown)
│   ├── TEMPLATE.md       # Plantilla para nuevos posts
│   ├── gadgets2024.md
│   ├── recycle.md
│   ├── win95.md
│   ├── 2026karate.md
│   └── 2026postspruebas.md
│
├── images/               # Imágenes del blog
├── assets/               # Assets adicionales
└── README.md
```

---

## 🔄 Flujo de Datos

### 1. **Carga Inicial** (`data.json` → `app.js`)

```
index.html se carga
    ↓
Evento DOMContentLoaded
    ↓
fetch('data.json')
    ↓
blogData = { blog, posts, navigation, links, contact }
    ↓
initApp() → Renderiza componentes dinámicos
    ↓
renderPostsList(4) → Muestra 4 últimos posts en home
```

### 2. **Lectura de un Post** (post.html)

```
usuario clickea en post → ?id=gadgets2024
    ↓
fetch('data.json') → Busca metadatos
    ↓
blogData.posts.find(p => p.id === 'gadgets2024')
    ↓
fetch('/posts/gadgets2024.md') → Lee archivo Markdown
    ↓
Showdown converter → Convierte MD a HTML
    ↓
Renderiza en #post-body con estilos retro
```

### 3. **Componentes Dinámicos** (in app.js)

```
renderNavigation()      → Lee data.json.navigation
renderAuthor()          → Lee data.json.blog
renderLinks()           → Lee data.json.links
renderFollowWidget()    → Lee data.json.contact
renderPostsList(limit)  → Ordena posts y muestra limitado
```

---

## 📝 Cómo Agregar Nuevas Publicaciones

### Paso 1: Crear el archivo Markdown

**Ubicación:** `posts/[id-del-post].md`

```markdown
# Título de mi Post

Breve introducción o resumen que aparecerá en el listado.

## Primera Sección

Contenido del post aquí...

## Segunda Sección

Más contenido...

### Subsección

Detalles importantes.
```

**Notas:**
- El ID del archivo debe ser único
- Usa números en minúsculas y guiones (ej: `mi-primer-post.md`)
- Puedes incluir imágenes: `![alt-text](/images/nombre.webp)`
- Soporta tablas, listas, código, etc.

### Paso 2: Registrar en `data.json`

Abre `data.json` y agrega un objeto en el array `posts`:

```json
{
  "posts": [
    {
      "id": "mi-nuevo-post",
      "title": "Mi Primer Post Increíble",
      "slug": "mi-nuevo-post",
      "date": "April 2, 2026",
      "excerpt": "Una breve descripción que aparecerá en el listado...",
      "editor": "Pascal"
    },
    // ... otros posts
  ]
}
```

**Campos requeridos:**
- `id`: Identificador único (debe coincidir con el nombre del archivo MD)
- `title`: Título del post (se muestra en listados y página del post)
- `slug`: URL-friendly version del título
- `date`: Fecha de publicación (formato: "Mes Día, Año")
- `excerpt`: Resumen corto (aparece en listados)
- `editor`: Autor del post

### Paso 3: ¡Listo! ✅

Automáticamente:
- ✅ El post aparecerá en el listado de posts (ordenado por fecha)
- ✅ Los últimos 4 posts aparecerán en la home
- ✅ Será clickeable y renderizado correctamente
- ✅ Se incluirán posts relacionados

---

## 🔧 Funciones Principales en `app.js`

### `initApp()`
```javascript
async function initApp()
```
Carga `data.json` y renderiza todos los componentes dinámicos.

### `renderPostsList(limit = null)`
```javascript
function renderPostsList(limit = null)
```
Renderiza posts ordenados del más reciente al más antiguo.
- `limit = 4` → Muestra 4 últimos posts (home)
- `limit = null` → Muestra todos los posts (página de posts)

### `renderRelatedPosts(currentPostId)`
Muestra 2 posts relacionados en la barra lateral.

---

## 🎨 Plantilla de Post Markdown

Siempre usa `posts/TEMPLATE.md` como referencia. Incluye:

✅ Título (H1)
✅ Párrafo introductorio
✅ Secciones (H2)
✅ Subsecciones (H3)
✅ Listas ordenadas y desordenadas
✅ Bloques de código
✅ Tablas
✅ Imágenes
✅ Links
✅ Blockquotes

---

## 🚀 Mejoras Identificadas

### **CRÍTICA: Bug en `renderRelatedPosts()`**

**Problema:** La función NO retorna HTML, solo mapea sin devolver valores.

```javascript
// ❌ ACTUAL (BUGGY)
container.innerHTML = related.map(post => {
  `<p><a href="/post.html?id=${post.id}">${post.title}</a></p>`
}).join('');

// ✅ DEBERÍA SER
container.innerHTML = related.map(post => 
  `<p><a href="/post.html?id=${post.id}">${post.title}</a></p>`
).join('');
```

**Impacto:** Los posts relacionados no se muestran.

---

### **1. Ordenamiento de Fechas Mejorado**

**Problema:** Las fechas están en formato "April 15, 2024" (string), que se ordena alfabéticamente.

**Solución propuesta:**

Convertir fechas a ISO format en `data.json`:

```json
{
  "id": "gadgets2024",
  "date": "2024-04-15",          // ← ISO format
  "displayDate": "April 15, 2024" // ← Para mostrar
}
```

Actualizar `app.js`:

```javascript
function renderPostsList(limit = null) {
  const sortedPosts = [...blogData.posts].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );
  // ...
  container.innerHTML = postsToShow.map(post => `
    <p>${post.displayDate}</p>
  `).join('');
}
```

---

### **2. Búsqueda y Filtrado de Posts**

**Mejora:** Agregar página de búsqueda

```javascript
function searchPosts(query) {
  return blogData.posts.filter(post => 
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(query.toLowerCase())
  );
}
```

Crear `search.html` con input de búsqueda.

---

### **3. Tags/Categorías para Posts**

**Mejora:** Agregar etiquetas a los posts

En `data.json`:

```json
{
  "id": "gadgets2024",
  "tags": ["gadgets", "tech", "2024"]
}
```

Permitir filtrar por tags en `posts.html`.

---

### **4. Pagination**

**Mejora:** Si hay muchos posts, paginar el listado

```javascript
function renderPostsList(limit = null, page = 1) {
  const startIdx = (page - 1) * limit;
  const endIdx = startIdx + limit;
  const postsToShow = sortedPosts.slice(startIdx, endIdx);
}
```

---

### **5. RSS Feed**

**Mejora:** Generar feed RSS automático

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>mei's tech blog</title>
    <!-- generar items desde data.json -->
  </channel>
</rss>
```

---

### **6. Validación al Agregar Posts**

**Mejora:** Script que valide que:

✅ El ID en `data.json` coincide con el archivo `.md`
✅ Todos los campos requeridos estén presentes
✅ Las fechas estén en formato válido
✅ Los IDs sean únicos

```javascript
function validatePosts() {
  blogData.posts.forEach(post => {
    if (!post.id || !post.title || !post.date) {
      console.error(`Post inválido:`, post);
    }
  });
}
```

---

### **7. Análisis y Metadata**

**Mejora:** Agregar contador de palabras, tiempo de lectura

```javascript
function getReadingTime(mdContent) {
  const wordsPerMinute = 200;
  const wordCount = mdContent.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
```

Mostrar en post: "Tiempo de lectura: ~5 min"

---

### **8. Caché de Markdown**

**Mejora:** Cachear archivos MD para mejor performance

```javascript
const mdCache = {};

async function getPostContent(postId) {
  if (mdCache[postId]) return mdCache[postId];
  
  const response = await fetch(`./posts/${postId}.md`);
  const content = await response.text();
  mdCache[postId] = content;
  return content;
}
```

---

### **9. Performance - Lazy Loading de Imágenes**

Ya implementado parcialmente en `post.html`:

```javascript
img.loading = "lazy";
```

✅ **Bien hecho** 👍

---

### **10. SEO Improvements**

**Mejora:** Agregar Open Graph meta tags

```html
<meta property="og:title" content="Post Title">
<meta property="og:description" content="Post excerpt">
<meta property="og:image" content="/images/thumbnail.webp">
<meta name="description" content="Post excerpt">
```

---

## 📊 Resumen de Estado

| Aspecto | Estado | Prioridad |
|--------|--------|-----------|
| Renderización de posts | ✅ Funcional | - |
| Ordenamiento de posts | ✅ Funcional | - |
| Componentes reutilizables | ✅ Funcional | - |
| Posts relacionados | ❌ Bug (no renderiza) | 🔴 ALTA |
| Formato de fechas | ⚠️ Funcional pero mejorable | 🟡 MEDIA |
| Búsqueda | ❌ No existe | 🟡 MEDIA |
| Tags/Categorías | ❌ No existe | 🟡 MEDIA |
| RSS Feed | ❌ No existe | 🟢 BAJA |
| SEO | ⚠️ Básico | 🟡 MEDIA |

---

## 🎯 Próximos Pasos Recomendados

1. **INMEDIATO:** Corregir bug en `renderRelatedPosts()`
2. **CORTO PLAZO:** Mejorar formato de fechas (ISO format)
3. **CORTO PLAZO:** Agregar búsqueda de posts
4. **MEDIANO PLAZO:** Implementar tags/categorías
5. **LARGO PLAZO:** Agregar pagination, RSS, analytics

---

## 📚 Referencias

- [Markdown Cheatsheet](https://www.markdownguide.org/cheat-sheet/)
- [Showdown.js Docs](http://showdownjs.com/)
- [Web Standards - MDN](https://developer.mozilla.org/en-US/)

---

**Última actualización:** April 2, 2026
**Autor:** Documentation Team
