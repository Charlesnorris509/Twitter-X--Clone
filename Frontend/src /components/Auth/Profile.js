// Profile.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState({
    username: '',
    bio: '',
    joinDate: '',
    followers: 0,
    following: 0,
    tweets: []
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    bio: ''
  });

  useEffect(() => {
    // TODO: Fetch user profile data
    // This is mock data
    setProfile({
      username: username || 'user123',
      bio: 'Welcome to my profile!',
      joinDate: 'January 2024',
      followers: 100,
      following: 150,
      tweets: []
    });
  }, [username]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement profile update logic
    setProfile({ ...profile, ...editForm });
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center space-x-4">
          <div className="h-20 w-20 rounded-full bg-gray-200"></div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">@{profile.username}</h1>
            {!isEditing ? (
              <p className="text-gray-600">{profile.bio}</p>
            ) : (
              <form onSubmit={handleEditSubmit} className="mt-2">
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  className="w-full p-2 border rounded"
                  rows="3"
                ></textarea>
                <div className="mt-2 space-x-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Edit Profile
            </button>
          )}
        </div>

        <div className="mt-6 flex space-x-4">
          <div className="text-center">
            <div className="font-bold">{profile.followers}</div>
            <div className="text-gray-600">Followers</div>
          </div>
          <div className="text-center">
            <div className="font-bold">{profile.following}</div>
            <div className="text-gray-600">Following</div>
          </div>
          <div className="text-center">
            <div className="font-bold">{profile.tweets.length}</div>
            <div className="text-gray-600">Tweets</div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Tweets</h2>
          {profile.tweets.length === 0 ? (
            <p className="text-gray-500">No tweets yet</p>
          ) : (
            <div className="space-y-4">
              {/* Tweet list would go here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
