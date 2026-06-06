async function getPosts(param)
{   
    const selectors = "select=title,body,tags"
    const posts = param ? `?${param}&${selectors}` : `?${selectors}` ;
    fetch(`https://dummyjson.com/posts${posts}`)
      .then(res => res.json())
      .then(console.log);
}


getPosts()