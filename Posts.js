async function ShowListOfPosts()
{
  const posts = await getPosts('?limit=15');
  const cardsOfPosts = getListOfPosts(posts)
}

const homePageInit = () => ShowListOfPosts()