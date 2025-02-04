import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Post = ({ post }) => {
    const [likes, setLikes] = useState(post.likes);
    const [comments, setComments] = useState(post.comments);

    const handleLike = async () => {
        await axios.post(`/posts/${post.id}/like`, { userId: 'currentUserId' });
        setLikes(likes + 1);
    };

    const handleComment = async (comment) => {
        await axios.post(`/posts/${post.id}/comment`, { userId: 'currentUserId', content: comment });
        setComments([...comments, { content: comment }]);
    };

    return (
        <div>
            <p>{post.content}</p>
            <button onClick={handleLike}>Like ({likes})</button>
            <div>
                {comments.map((comment, index) => (
                    <p key={index}>{comment.content}</p>
                ))}
            </div>
            <textarea onChange={(e) => handleComment(e.target.value)} />
        </div>
    );
};

export default Post;
