  function getFavoritesPosts()
 {
    const favoritesPostsContainer = document.querySelector(".favoritePosts-container");
    favoritesPostsContainer.innerHTML = "";
    const favoritesList = JSON.parse(localStorage.getItem('favoritesList') || '[]');
    if (!Array.isArray(favoritesList) || favoritesList.length === 0) return;

    favoritesList.forEach(post => {
      const tagsHtml = (post.tags || []).map(t => `<span class="tag-pill">${t}</span>`).join('');
      favoritesPostsContainer.innerHTML += `<div class="post" data-id="${post.id}">
            <div class="post-header">
               <h2>${post.title}</h2>
            </div>
            <p class="post-body">${post.body}</p>
            <div class="post-footer">
              <div class="tags-inline">${tagsHtml}</div>
            </div>
          </div>`
    })
 }
 
 function favoritePostsPageInit()
 {
      getFavoritesPosts()
 }