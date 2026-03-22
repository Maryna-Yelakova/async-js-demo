async function fetchPost(postId) {
  const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

async function main() {
  try {
    console.log("Fetching post...");
    const post = await fetchPost(1);
    console.log("Post id:", post.id);
    console.log("Title:", post.title);
    console.log("Body:", post.body);
  } catch (error) {
    console.error("Fetch failed:", error.message);
    console.error("Tip: check internet connection or API availability.");
  }
}

main();
