async function ShowListOfPosts()
{
  const posts = await getPosts('?limit=15');
  const cardsOfPosts = await getListOfPosts(posts)
}

const homePageInit = () => ShowListOfPosts()