


async function getPostDetails(id)
{
        const detailsPage = document.getElementById('details');
        if (detailsPage) {
            const titleEl = detailsPage.querySelector('h1');
            const contentEl = detailsPage.querySelector('div');
            if (titleEl) titleEl.textContent = 'Loading...';
            if (contentEl) contentEl.innerHTML = '';
        }

        try {
            const res = await fetch(`https://dummyjson.com/posts/${id}`);
            if (!res.ok) throw new Error('Network response was not ok');
            const post = await res.json();
            renderPostDetails(post);
        } catch (err) {
            console.error(err);
            const detailsPage = document.getElementById('details');
            if (detailsPage) {
                const titleEl = detailsPage.querySelector('h1');
                const contentEl = detailsPage.querySelector('div');
                if (titleEl) titleEl.textContent = 'Error loading post';
                if (contentEl) contentEl.textContent = 'Could not load the post details.';
            }
        }
}


function renderPostDetails(post) {
    const detailsPage = document.getElementById('details');
    if (!detailsPage) return;

    const titleEl = detailsPage.querySelector('h1');
    const contentEl = detailsPage.querySelector('div');
    if (titleEl) titleEl.textContent = post.title || 'Post details';

    const tagsHtml = Array.isArray(post.tags) ? post.tags.map(t => `<span class="tag-pill">${t}</span>`).join('') : '';

    if (contentEl) {
        contentEl.innerHTML = `
            <div class="details-container">
                <div class="details-header">
                    <div class="details-title-wrap">
                        <h2 class="details-title">${post.title}</h2>
                        <div class="details-sub">Author ID: ${post.userId ?? '—'}</div>
                    </div>
                    <div class="details-actions">
                        <button type="button" class="back-btn" onclick="changePage('home')">Back</button>
                    </div>
                </div>
                <div class="details-body">
                    <p>${post.body}</p>
                </div>
                <div class="details-meta">
                    <div class="details-tags">${tagsHtml}</div>
                    <div class="details-extra">Reactions: ${post.reactions ?? '—'}</div>
                </div>
            </div>
        `;
    }
}



function detailsPageInit(id) {
   getPostDetails(id);
}
