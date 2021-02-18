fetch("/api/posts", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
}).then(function (reponse) {
  reponse.json().then(function (posts) {
    displayPosts(posts);
  });
});

function displayPosts(posts) {
  for (const post of posts) {
    const newPost = document.createElement("div");
    newPost.innerText = post.body.post;
    document.body.appendChild(newPost);
  }
}
