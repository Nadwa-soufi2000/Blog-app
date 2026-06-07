const favorites = new Set();
let currentPosts = [];

async function getPosts(param)
{   
    const selectors = "select=title,body,tags,id"
    const posts = param ? `${param}&${selectors}` : `?${selectors}` ;
    const res = await fetch("https://dummyjson.com/posts" + posts);
    const response = await res.json();
    console.log(response.posts)
    return response.posts;           
}

function updateFavoriteCount() {
  const badge = document.querySelector('.header-badge .badge');
  if (badge) {
    badge.textContent = favorites.size;
  }
}

function renderFavoriteButton(postId) {
  const isFavorite = favorites.has(String(postId));
  return `<button type="button" class="favorite-btn${isFavorite ? ' active' : ''}" data-id="${postId}">
            <span class="favorite-icon">${isFavorite ? '♥' : '♡'}</span>
            <span class="favorite-text">${isFavorite ? 'Remove from favorites' : 'Add to favorites'}</span>
          </button>`;
}

async function getListOfPosts(posts)
{
   currentPosts = posts;
   const postsContainer = document.querySelector(".posts-container");
   postsContainer.innerHTML = "";
   posts.forEach( post => {
    const tagsHtml = post.tags.map(t => `<span class="tag-pill">${t}</span>`).join('');
    const favoriteButton = renderFavoriteButton(post.id);
    const favoriteChip = favorites.has(String(post.id)) ? '<span class="favorite-chip">Favorite</span>' : '';

    postsContainer.innerHTML += 
      `<div class="post${favorites.has(String(post.id)) ? ' favorite' : ''}" data-id="${post.id}">
        <div class="post-header">
          <h2>${post.title}</h2>
          ${favoriteButton}
        </div>
        <p class="post-body">${post.body}</p>
        <div class="post-footer">
          <div class="tags-inline">${tagsHtml}</div>
          ${favoriteChip}
        </div>
      </div>`
   })
   updateFavoriteCount();
}

const postsContainer = document.querySelector('.posts-container');
if (postsContainer) {
  postsContainer.addEventListener('click', event => {
    const button = event.target.closest('.favorite-btn');
    if (!button) return;

    const postId = button.dataset.id;
    if (!postId) return;

    if (favorites.has(postId)) {
      favorites.delete(postId);
    } else {
      favorites.add(postId);
    }
    getListOfPosts(currentPosts);
  });
}

document.addEventListener("DOMContentLoaded" , (e) => {
  homePageInit()
})