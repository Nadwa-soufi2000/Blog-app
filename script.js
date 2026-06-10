const favorites = new Set();
let currentPosts = [];

function loadFavoritesFromStorage() {
  const raw = localStorage.getItem('favoritesList');
  if (!raw) return;

  try {
    const savedFavorites = JSON.parse(raw);
    if (!Array.isArray(savedFavorites)) return;

    savedFavorites.forEach(item => {
      const id = typeof item === 'object' && item !== null && item.id != null
        ? item.id
        : item;
      if (id != null) {
        favorites.add(String(id));
      }
    });
  } catch (e) {
    console.warn('Could not parse favoritesList from localStorage', e);
  }
}

async function getPosts(param)
{   
    const selectors = "select=title,body,tags,id"
    const posts = param ? `${param}&${selectors}` : `?${selectors}`;
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

function getListOfPosts(posts)
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
          <button type="button" class="details-btn" onclick="changePage('details', ${post.id})">View details</button>
        </div>
      </div>`
   })
   updateFavoriteCount();

   const favoritePosts = posts.filter(post => favorites.has(String(post.id)));
   try {
     localStorage.setItem('favoritesList', JSON.stringify(favoritePosts));
   } catch (e) {
     console.warn('Could not save favorites to localStorage', e);
   }
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


let currentPage = "home";
function changePage(page, id) {
  // check if page has been changed
  if (page == currentPage) {
    return;
  }
  currentPage = page;
  // 1) hide all pages
  const pages = document.getElementsByTagName("main")
  for (let i = 0; i < pages.length; i++) {
    const element = pages[i];
    // element.style.display = "none"
    element.classList.remove("show")
    element.classList.add("hide")
  }

  setTimeout(() => {
    document.getElementById(page).classList.remove("hide");
    document.getElementById(page).classList.add("show");
  }, 400);

  // 3) setup
  if (page == "home") {
    homePageInit();
    document.title = "Posts Page";
  } else if (page == "favoritePosts") {
    favoritePostsPageInit();
    document.title = "Favorite Posts Page";
  } else if (page == "details") {
    detailsPageInit(id);
  }
}


document.addEventListener("DOMContentLoaded" , (e) => {
  loadFavoritesFromStorage();
  homePageInit();
})