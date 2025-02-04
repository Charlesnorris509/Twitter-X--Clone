import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('/posts')
            .then(response => setPosts(response.data));
    }, []);

    return (
        <div>
            {posts.map(post => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
};

export default PostList;
