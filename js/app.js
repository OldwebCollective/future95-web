let blogData = {};

async function initApp() {
  try {
    const response = await fetch('/data.json');
    blogData = await response.json();
    
    renderNavigation();
    renderAuthor();
    renderLinks();
    renderFollowWidget();
  } catch (error) {
    console.error('Error cargando datos:', error);
  }
}

function renderNavigation() {
  const navContainer = document.getElementById('main-nav');
  if (!navContainer) return;
  
  navContainer.innerHTML = blogData.navigation.map(item => 
    `<a href="${item.href}">${item.label}</a>`
  ).join('');
}

function renderAuthor() {
  const avatar = document.getElementById('avatar');
  const authorName = document.getElementById('author-name');
  const authorDesc = document.getElementById('author-desc');
  
  if (avatar) avatar.src = blogData.blog.avatar;
  if (authorName) authorName.textContent = blogData.blog.author;
  if (authorDesc) authorDesc.textContent = blogData.blog.description;
}

function renderLinks() {
  const linksList = document.getElementById('links-list');
  if (!linksList) return;
  
  linksList.innerHTML = blogData.links.map(link => 
    `<li><a href="${link.href}">${link.label}</a></li>`
  ).join('');
}

function renderFollowWidget() {
  const handle = document.getElementById('handle');
  if (handle) handle.textContent = blogData.contact.handle;
}

function renderPostsList() {
  const container = document.getElementById('posts-container');
  if (!container) return;
  
  container.innerHTML = blogData.posts.map(post => `
    <div class="window post">
      <div class="title-bar">
        <a href="/post.html?id=${post.id}">${post.title}</a>
      </div>
      <div class="window-content">
        <p>${post.date}</p>
        <p>${post.excerpt}</p>
      </div>
    </div>
  `).join('');
}

function renderRelatedPosts(currentPostId) {
  const container = document.getElementById('related-posts');
  if (!container) return;
  
  const related = blogData.posts.filter(p => p.id !== currentPostId).slice(0, 2);
  container.innerHTML = related.map(post => 
    `<p><a href="/post.html?id=${post.id}">${post.title}</a></p>`
  ).join('');
}
