import React, { useState } from 'react';
import dbArtworks from '../Artworks/dbArtworks.json';
import Image from 'next/image';
import { useUser } from '@/context/UserContext'

const MyArtworksComponent = ({ artworkID }) => {
  const { dbUpdate, setDbUpdate } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedArtwork, setEditedArtwork] = useState(null);
  const [displayedArtwork, setDisplayedArtwork] = useState(null);
  
  // Find the artwork with matching ID
  const artwork = dbArtworks.artworks.find(art => art.id === artworkID);

  // Initialize both edited and displayed artwork
  React.useEffect(() => {
    if (artwork) {
      setDisplayedArtwork(artwork);
      setEditedArtwork(artwork);
    }
  }, [artwork]);

  if (!artwork) {
    return <div>Artwork not found</div>;
  }

  // Initialize editedArtwork when entering edit mode
  const handleEditClick = () => {
    setEditedArtwork({ ...artwork });
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedArtwork(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value
    }));
  };


  const handleDeleteClick = async () => {
    const oldDisplayed = displayedArtwork;

    try {
      // Immediately remove from display
      setDisplayedArtwork(null);

      // Trigger API call to remove from the database
      const response = await fetch('/api/artworks/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ artworkId: artworkID })
      });

      if (!response.ok) {
        throw new Error('Failed to delete artwork');
      }
      
      // Force a fresh load or update of data, if needed
      setDbUpdate(true);
    } catch (error) {
      console.error('Error deleting artwork:', error);
      // Revert UI change if something goes wrong
      setDisplayedArtwork(oldDisplayed);
      alert('Unable to delete artwork. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updateData = {
      title: editedArtwork.title,
      price: editedArtwork.price,
      description: editedArtwork.description
    };
    try {
      const response = await fetch(`/api/artworks/edit/${artworkID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        const updatedArtwork = await response.json();
        setIsEditing(false);
        setDbUpdate(true);
        // Update the displayed artwork immediately
        setDisplayedArtwork({
          ...displayedArtwork,
          ...updateData
        });
      } else {
        const errorData = await response.json();
        console.error('Failed to update artwork:', errorData.error);
        alert('Failed to update artwork. Please try again.');
      }
    } catch (error) {
      console.error('Error updating artwork:', error);
      alert('An error occurred while updating the artwork.');
    }
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="border rounded-lg p-4 shadow-md">
        <div className="relative w-full h-48 mb-4">
          <Image
            src={artwork.picture}
            alt={artwork.title}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={editedArtwork.title}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={editedArtwork.price}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={editedArtwork.description}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    );
  }

  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      <div className="relative w-full h-48 mb-4">
        <Image
          src={artwork.picture}
          alt={artwork.title}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{displayedArtwork?.title || artwork.title}</h3>
          <span className="text-lg font-semibold text-green-600">
            ${displayedArtwork?.price?.toLocaleString() || artwork.price?.toLocaleString()}
          </span>
        </div>
        <p className="text-gray-600">{displayedArtwork?.description || artwork.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500">
            {artwork.medium}
          </span>
          <span className="text-sm text-gray-500">
            {artwork.dimensions}
          </span>
        </div>
        <button
          onClick={handleEditClick}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
        >
          Edit Artwork
        </button>


<button onClick={handleDeleteClick} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full">Delete Artwork</button>

      </div>
    </div>
  );
};

export default MyArtworksComponent;
