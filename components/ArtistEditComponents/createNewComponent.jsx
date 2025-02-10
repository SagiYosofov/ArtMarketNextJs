// Import form field components and custom hook
import { FormField, SelectField } from "./EditFields"
import useCreateNewArt from "../../hooks/useCreateNewArt"

const CreateNewComponent = ({ onClose }) => {
    const { formData, handleChange, handleSubmit, MEDIUM_OPTIONS, DIMENSION_OPTIONS, ALLOWED_HOSTS_MESSAGE, isLoading } =
        useCreateNewArt({ onClose })

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Create New Artwork</h2>
            {/* Form with auto-generated fields and editable input fields */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Auto-generated fields (disabled) */}
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

                {/* User input fields */}
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

                {/* Artist name is auto-populated and readonly */}
                <FormField label="Artist Name">
                    <input
                        type="text"
                        name="artistName"
                        value={formData.artistName}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        disabled
                    />
                </FormField>

                {/* Artwork details input fields */}
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

                {/* Dropdown selections for medium and dimensions */}
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

                {/* URL input for artwork image with allowed hosts hint */}
                <FormField label="Picture URL" hint={ALLOWED_HOSTS_MESSAGE.replace(/\n/g, " | ")}>
                    <input
                        type="url"
                        name="picture"
                        value={formData.picture}
                        onChange={handleChange}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        required
                    />
                </FormField>

                {/* Numeric input for artwork price */}
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

                {/* Submit button with loading state */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Adding Artwork..." : "Add Artwork"}
                </button>
            </form>
        </div>
    )
}

export default CreateNewComponent
