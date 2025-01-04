import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Feed from '../components/Feed';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();

        if (response.ok) {
          setPosts(data);
        } else {
          throw new Error(data.message || 'Failed to fetch posts');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="home-page">
      <NavBar />
      <main className="feed-container">
        {loading ? (
          <p>Loading feed...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <Feed posts={posts} />
        )}
      </main>
    </div>
  );
};

export default Home;
