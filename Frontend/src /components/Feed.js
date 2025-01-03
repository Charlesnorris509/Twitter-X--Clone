import React, { useState, useEffect } from 'react';
import Post from './Post';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated API fetch for posts
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts'); // Replace with actual API endpoint
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="feed-container">
      <h2>Feed</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        posts.map((post) => <Post key={post.id} {...post} />)
      )}
    </div>
  );
};

export default Feed;
