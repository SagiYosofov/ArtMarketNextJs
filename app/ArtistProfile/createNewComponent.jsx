import { useState } from 'react';
import { useUser } from '@/context/UserContext'
import { useData } from '@/context/DataContext'

// Constants
const INITIAL_FORM_STATE = {
  id: '',
  artistId: '',
  title: '',
  artistName: '',
  description: '',
  medium: '',
  dimensions: '',
  picture: '',
  price: ''
};

const MEDIUM_OPTIONS = [
  { value: "Canvas and Fabric", label: "Canvas and Fabric" },
  { value: "Mixed Media", label: "Mixed Media" },
  { value: "Digital Photography", label: "Digital Photography" },
  { value: "NFT", label: "NFT" },
  { value: "Oil and acrylic on canvas", label: "Oil and acrylic on canvas" }
];

const DIMENSION_OPTIONS = [
  { value: "Small (up to 12x12 inches)", label: "Small (up to 12x12 inches)" },
  { value: "Medium (13x13 to 24x24 inches)", label: "Medium (13x13 to 24x24 inches)" },
  { value: "Large (25x25 to 36x36 inches)", label: "Large (25x25 to 36x36 inches)" },
  { value: "Extra Large (37x37 to 48x48 inches)", label: "Extra Large (37x37 to 48x48 inches)" },
  { value: "Oversized (larger than 48x48 inches)", label: "Oversized (larger than 48x48 inches)" }
];

const VALID_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

// Form Field Component
const FormField = ({ label, children, hint }) => (
  <div>
    <label className="block mb-1">{label}</label>
    {children}
    {hint && <p className="text-sm text-gray-500 mt-1">{hint}</p>}
  </div>
);

// Select Field Component
const SelectField = ({ label, name, value, onChange, options, required = false }) => (
  <FormField label={label}>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
      required={required}
    >
      <option value="">Select {label.toLowerCase()}</option>
      {options.map(({ value, label }) => (
        <option key={value} value={value}>{label}</option>
      ))}
    </select>
  </FormField>
);

const CreateNewComponent = ({ onClose }) => {
  const { user } = useUser();
  const { setDbUpdate } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    ...INITIAL_FORM_STATE,
    id: Math.floor(Math.random() * 1000000),
    artistId: user.artistData.id,
    artistName: `${user.firstName} ${user.lastName}`
  });

  const validateImageUrl = (url) => {
    try {
      const parsedUrl = new URL(url);
      if (!VALID_IMAGE_EXTENSIONS.some(ext => parsedUrl.pathname.toLowerCase().endsWith(ext))) {
        throw new Error('Invalid image extension');
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'picture' && value !== '') {
      if (!validateImageUrl(value)) {
        alert('Please enter a valid image URL. URL must end with .jpg, .jpeg, .png, .gif, or .webp');
        return;
      }
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/artworks/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to add artwork');

      setFormData(INITIAL_FORM_STATE);
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
        <FormField label="Artwork ID">
          <input
            type="text"
            name="id"
            value={formData.id}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
            disabled
          />
        </FormField>

        <FormField label="Artist ID">
          <input
            type="text"
            name="artistId"
            value={formData.artistId}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
            disabled
          />
        </FormField>

        <FormField label="Title">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          />
        </FormField>

        <FormField label="Artist Name">
          <input
            type="text"
            name="artistName"
            value={formData.artistName}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
            disabled
          />
        </FormField>

        <FormField label="Description">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
            rows="3"
            required
          />
        </FormField>

        <SelectField
          label="Medium"
          name="medium"
          value={formData.medium}
          onChange={handleChange}
          options={MEDIUM_OPTIONS}
          required
        />

        <SelectField
          label="Dimensions"
          name="dimensions"
          value={formData.dimensions}
          onChange={handleChange}
          options={DIMENSION_OPTIONS}
          required
        />

        <FormField 
          label="Picture URL"
          hint="Please enter a direct image URL (must end with .jpg, .jpeg, .png, .gif, or .webp)"
        >
          <input
            type="url"
            name="picture"
            value={formData.picture}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          />
        </FormField>

        <FormField label="Price">
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          />
        </FormField>

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

