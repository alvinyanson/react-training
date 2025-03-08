import { useState, useEffect } from 'react'

function App() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts") // Adjust the URL if needed
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []); // Runs only on component mount

  return (
    <>
      <div className="container py-5 py-2">
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      </div >
    </>
  )
}

export default App
