import { useState } from 'react';
import { useUser } from '@/context/UserContext'
import { useData } from '@/context/DataContext'


const CreateNewComponent = ({ onClose }) => {
  const { user } = useUser();
  const { setDbUpdate } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: Math.floor(Math.random() * 1000000),
    artistId: user.artistData.id,
    title: '',
    artistName: `${user.firstName} ${user.lastName}`,
    description: '',
    medium: '',
    dimensions: '',
    picture: '',
    price: ''
  });

  const isImageUrl = (url) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    return imageExtensions.some(ext => url.toLowerCase().endsWith(ext));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Special validation for picture URL
    if (name === 'picture' && value !== '') {
      try {
        const url = new URL(value);
        if (!isImageUrl(url.pathname)) {
          alert('Please enter a valid image URL. URL must end with .jpg, .jpeg, .png, .gif, or .webp');
          return;
        }
      } catch (error) {
        alert('Please enter a valid URL');
        return;
      }
    }

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/artworks/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to add artwork');
      }

      // Clear form after successful submission
      setFormData({
        id: '',
        artistId: '',
        title: '',
        artistName: '',
        description: '',
        medium: '',
        dimensions: '',
        picture: '',
        price: ''
      });
      setDbUpdate(true);
      alert('Artwork added successfully!');
      onClose();
    } catch (error) {
      console.error('Error adding artwork:', error);
      alert('Failed to add artwork');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create New Artwork</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Artwork ID</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
            disabled
          />
        </div>

        <div>
          <label className="block mb-1">Artist ID</label>
          <input
            type="text"
            name="artistId"
            value={formData.artistId}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
            disabled
          />
        </div>

        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Artist Name</label>
          <input
            type="text"
            name="artistName"
            value={formData.artistName}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
            disabled
          />
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
            rows="3"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Medium</label>
          <select
            name="medium"
            value={formData.medium}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          >
            <option value="">Select a medium</option>
            <option value="Canvas and Fabric">Canvas and Fabric</option>
            <option value="Mixed Media">Mixed Media</option>
            <option value="Digital Photography">Digital Photography</option>
            <option value="NFT">NFT</option>
            <option value="Oil and acrylic on canvas">Oil and acrylic on canvas</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Dimensions</label>
          <select
            name="dimensions"
            value={formData.dimensions}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          >
            <option value="">Select dimensions</option>
            <option value="Small (up to 12x12 inches)">Small (up to 12x12 inches)</option>
            <option value="Medium (13x13 to 24x24 inches)">Medium (13x13 to 24x24 inches)</option>
            <option value="Large (25x25 to 36x36 inches)">Large (25x25 to 36x36 inches)</option>
            <option value="Extra Large (37x37 to 48x48 inches)">Extra Large (37x37 to 48x48 inches)</option>
            <option value="Oversized (larger than 48x48 inches)">Oversized (larger than 48x48 inches)</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Picture URL</label>
          <input
            type="url"
            name="picture"
            value={formData.picture}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            Please enter a direct image URL (must end with .jpg, .jpeg, .png, .gif, or .webp)
          </p>
        </div>

        <div>
          <label className="block mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Adding Artwork...' : 'Add Artwork'}
        </button>
      </form>
    </div>
  );
};

export default CreateNewComponent;

