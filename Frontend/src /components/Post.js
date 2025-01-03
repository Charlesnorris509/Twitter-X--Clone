import React from 'react';

const Post = ({ id, author, content, media, createdAt, likes, comments }) => {
  return (
    <div className="post" id={`post-${id}`}>
      <div className="post-header">
        <img
          src={author.avatar || '/default-avatar.png'}
          alt={`${author.name}'s avatar`}
          className="avatar"
        />
        <div>
          <h3>{author.name}</h3>
          <p className="timestamp">{new Date(createdAt).toLocaleString()}</p>
        </div>
      </div>
      <div className="post-content">
        <p>{content}</p>
        {media && <img src={media} alt="Post media" className="post-media" />}
      </div>
      <div className="post-actions">
        <button onClick={() => console.log('Liked post:', id)}>❤️ {likes}</button>
        <button onClick={() => console.log('View comments for post:', id)}>
          💬 {comments.length}
        </button>
      </div>
    </div>
  );
};

export default Post;
