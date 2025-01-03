import React, { useState } from 'react';

const Post = ({ user, onPostSubmit }) => {
  const [text, setText] = useState('');
  const [media, setMedia] = useState([]);
  const [error, setError] = useState('');

  const allowedFileTypes = {
    images: ['image/png', 'image/jpeg', 'image/gif'],
    videos: ['video/mp4', 'video/ogg', 'video/webm'],
    documents: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  };

  const validateFile = (file) => {
    const { type, size } = file;
    const maxSize = 5 * 1024 * 1024; // 5MB limit

    const isAllowedType =
      allowedFileTypes.images.includes(type) ||
      allowedFileTypes.videos.includes(type) ||
      allowedFileTypes.documents.includes(type);

    if (!isAllowedType) {
      return 'Unsupported file type. Please upload an image, video, or document.';
    }

    if (size > maxSize) {
      return 'File size exceeds 5MB. Please upload a smaller file.';
    }

    return null;
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const errors = [];

    const validatedFiles = files.reduce((acc, file) => {
      const error = validateFile(file);
      if (error) {
        errors.push(error);
        return acc;
      }
      return [...acc, file];
    }, []);

    if (errors.length > 0) {
      setError(errors.join(' '));
      return;
    }

    setError('');
    setMedia([...media, ...validatedFiles]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text && media.length === 0) {
      setError('Please add some content or media to your post.');
      return;
    }

    const postData = new FormData();
    postData.append('text', text);
    media.forEach((file, index) => postData.append(`media[${index}]`, file));

    onPostSubmit(postData);
    setText('');
    setMedia([]);
    setError('');
  };

  return (
    <div className="post-container">
      <form onSubmit={handleSubmit} className="post-form">
        <textarea
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="post-input"
        />
        <div className="media-preview">
          {media.map((file, index) => {
            const isImage = allowedFileTypes.images.includes(file.type);
            const isVideo = allowedFileTypes.videos.includes(file.type);
            const isDocument = allowedFileTypes.documents.includes(file.type);

            return (
              <div key={index} className="media-item">
                {isImage && <img src={URL.createObjectURL(file)} alt="Preview" />}
                {isVideo && (
                  <video controls>
                    <source src={URL.createObjectURL(file)} type={file.type} />
                    Your browser does not support the video tag.
                  </video>
                )}
                {isDocument && (
                  <a href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer">
                    {file.name}
                  </a>
                )}
              </div>
            );
          })}
        </div>
        <div className="file-upload">
          <label htmlFor="file-input" className="upload-label">
            Upload Media
          </label>
          <input
            id="file-input"
            type="file"
            multiple
            onChange={handleFileChange}
            className="upload-input"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">
          Post
        </button>
      </form>
    </div>
  );
};

export default Post;
