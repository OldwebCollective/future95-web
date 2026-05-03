let blogData = {};
let currentTrackIndex = 0;
//let playlist = [];

async function initApp() {
  try {
    const response = await fetch("./data.json");
    blogData = await response.json();
  } catch (error) {
    console.error("Error cargando datos:", error);
  }
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

  const tableRows = postsToShow
    .map(
      (post) => `
      <tr style="border-bottom: 1px solid #dfdfdf;">
        <td style="padding: 5px; width: 45px; vertical-align: middle;">
          ${
            post.thumbnail
              ? `<img src="${post.thumbnail}" alt="" style="width: 40px; height: 40px; object-fit: cover; border: 1px solid #808080; display: block;">`
              : `<div style="width: 40px; height: 40px; background: #eee; border: 1px solid #808080;"></div>`
          }
        </td>
        <td style="padding: 5px; vertical-align: middle;">
          <a href="post.html?id=${post.id}" style="text-decoration: none; color: blue; display: block;">
            <strong style="font-size: 14px;">${post.title}</strong><br>
            <small style="color: #808080; font-size: 10px;">${formatDate(post.date)}</small><br>
            <small style="color: #0080ff; font-size: 9px;">${(post.categories || []).join(", ")}</small>
          </a>
        </td>
      </tr>`,
    )
    .join("");
  container.innerHTML = `
      <table width="100%" cellspacing="0" cellpadding="0" style="background-color: #000000; color: #e0e0e0; border-collapse: collapse; font-family: sans-serif;">
        <tbody>
          ${tableRows}
        </tbody>
      </table>
  `;
}

function renderRelatedPosts(currentPostId) {
  const container = document.getElementById("related-posts");

  if (!container || !blogData.posts) return;

  const currentId = String(currentPostId);

  const currentPost = blogData.posts.find((p) => String(p.id) === currentId);

  const related = blogData.posts
    .filter((p) => String(p.id) !== currentId)
    .filter((p) => p.category === currentPost?.category)
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);

  container.innerHTML = related
    .map((post) => {
      const safeTitle = post.title.replace(/[&<>"']/g, "");
      return `<p><a href="post.html?id=${post.id}">${safeTitle}</a></p>`;
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
    <table border="1" cellspacing="0" cellpadding="10" style="width: 100%; border-collapse: collapse; font-family: sans-serif;">
      <tbody>
        <tr>
          <td>
            <a href="post.html?id=${featured.id}" style="font-weight: bold; font-size: 18px; text-decoration: none; color: blue;">
              ${featured.title}
            </a>
            <div style="margin: 5px 0; font-size: 10px; color: #808080;">
              ${formatDate(featured.date)}
            </div>
            <p style="margin: 10px 0;">${featured.excerpt}</p>
            <a href="post.html?id=${featured.id}" style="font-size: 12px;">Read full post →</a>
          </td>
        </tr>
      </tbody>
    </table>
  `;
}

function getArchiveLogs() {
  const postLogs = blogData.posts.map((post) => ({
    type: "post",
    date: post.date,
    data: post,
  }));

  const eventLogs = blogData.events.map((event) => ({
    type: "event",
    date: event.date,
    data: event,
  }));

  return [...postLogs, ...eventLogs].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );
}

function renderArchivePosts() {
  const container = document.getElementById("archives-container");
  if (!container) return;

  const logs = getArchiveLogs();

  container.innerHTML = logs
    .map((log) => {
      const date = formatSlashDate(log.date);

      if (log.type === "post") {
        return `<p><span>${date}</span> - [POST] <a href="post.html?id=${log.data.id}">${log.data.title}</a></p>`;
      }

      return `<p><span>${date}</span> - [UPDATE] <em>${log.data.text}</em></p>`;
    })
    .join("");
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
            <a href="post.html?id=${post.id}" class="post-link">
              <strong>${post.title}</strong>
            </a>
            <p class="post-date">${formatDate(post.date)}</p>
            <p class="post-excerpt">${post.excerpt}</p>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
  `;
}
