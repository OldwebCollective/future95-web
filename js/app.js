let blogData = {};

async function initApp() {
  try {
    const response = await fetch("/data.json");
    blogData = await response.json();

    renderNavigation();
    renderAuthor();
    renderLinks();
    renderFollowWidget();
  } catch (error) {
    console.error("Error cargando datos:", error);
  }
}

function renderNavigation() {
  const navContainer = document.getElementById("main-nav");
  if (!navContainer) return;

  navContainer.innerHTML = blogData.navigation
    .map((item) => `<a href="${item.href}">${item.label}</a>`)
    .join("");
}

function renderAuthor() {
  const avatar = document.getElementById("avatar");
  const authorName = document.getElementById("author-name");
  const authorDesc = document.getElementById("author-desc");

  if (avatar) avatar.src = blogData.blog.avatar;
  if (authorName) authorName.textContent = blogData.blog.author;
  if (authorDesc) authorDesc.textContent = blogData.blog.description;
}

function renderLinks() {
  const linksList = document.getElementById("links-list");
  if (!linksList) return;

  linksList.innerHTML = blogData.links
    .map((link) => `<li><a href="${link.href}">${link.label}</a></li>`)
    .join("");
}

function renderFollowWidget() {
  const handle = document.getElementById("handle");
  if (handle) handle.textContent = blogData.contact.handle;
}

function renderPostsList(limit = null) {
  const container = document.getElementById("posts-container");
  if (!container) return;
  const sortedPosts = [...blogData.posts].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  const postsToShow = limit ? sortedPosts.slice(0, limit) : sortedPosts;

  const linksList = postsToShow
    .map(
      (post) => `<li><a href="/post.html?id=${post.id}">${post.title}</a></li>`,
    )
    .join("");

  container.innerHTML = `
        <div class="window-content">
          <ul id="links-list">
            ${linksList}
          </ul>
        </div>
  `;
}

function renderRelatedPosts(currentPostId) {
  const container = document.getElementById("related-posts");
  if (!container) return;

  const related = blogData.posts
    .filter((p) => p.id !== currentPostId)
    .slice(0, 2);
  container.innerHTML = related
    .map((post) => {
      `<p><a href="/post.html?id=${post.id}">${post.title}</a></p>`;
    })
    .join("");
}

function renderFeaturedPost() {
  const container = document.getElementById("featured-post-container");
  if (!container || !blogData.posts || blogData.posts.length === 0) return;

  const sortedPosts = [...blogData.posts].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );
  const featured = sortedPosts[0];

  container.innerHTML = `
    <div class="window" style="background: #dfdfdf; border-color: #fff #404040 #404040 #fff; box-shadow: 1px 1px 0 #dfdfdf, 2px 2px 0 #808080;">
      <div class="title-bar" style="color: black; background: #d2c491;">
        FEATURED POST
      </div>
      <div class="window-content">
        <a href="/post.html?id=${featured.id}" style="text-decoration: none; color: #07070d; font-weight: bold; font-size: 12px; display: block; margin-bottom: 8px;">
          🔥 ${featured.title}
        </a>
        <p style="margin: 5px 0; font-size: 10px; color: #808080;">${featured.date}</p>
        <p style="margin: 8px 0; font-size: 11px; line-height: 1.4;">${featured.excerpt}</p>
        <a href="/post.html?id=${featured.id}" style="color: blue; font-size: 11px;">Read full post →</a>
      </div>
    </div>
  `;
}

function renderLatestPostsHome() {
  const container = document.getElementById("posts-container");
  if (!container) return;

  const sortedPosts = [...blogData.posts].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  const latestPosts = sortedPosts.slice(0, 4);

  container.innerHTML = `
    <div class="window">
      <div class="title-bar">LATEST POSTS</div>
      <div class="window-content">
        ${latestPosts
          .map(
            (post) => `
          <div class="post-item">
            <a href="/post.html?id=${post.id}" class="post-link">
              <strong>${post.title}</strong>
            </a>
            <p class="post-date">${post.date}</p>
            <p class="post-excerpt">${post.excerpt}</p>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderLatestSinglePost() {
  const container = document.getElementById("latest-post-container");
  if (!container || !blogData.posts || blogData.posts.length === 0) return;

  const sortedPosts = [...blogData.posts].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  const latestPost = sortedPosts[1] || sortedPosts[0];

  container.innerHTML = `
    <div class="window">
      <div class="title-bar">LATEST POST</div>
      <div class="window-content">
        <a href="/post.html?id=${latestPost.id}" style="text-decoration: none; color: #07070d; font-weight: bold; font-size: 12px; display: block; margin-bottom: 8px;">
          📝 ${latestPost.title}
        </a>
        <p style="margin: 5px 0; font-size: 10px; color: #808080;">${latestPost.date}</p>
        <p style="margin: 8px 0; font-size: 11px; line-height: 1.4;">${latestPost.excerpt}</p>
        <a href="/post.html?id=${latestPost.id}" style="color: blue; font-size: 11px;">Read full post →</a>
      </div>
    </div>
  `;
}
