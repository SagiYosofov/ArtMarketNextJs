export const createNewConstants = () => {
    // Constants
    const INITIAL_FORM_STATE = {
        id: "",
        artistId: "",
        title: "",
        artistName: "",
        description: "",
        medium: "",
        dimensions: "",
        picture: "",
        price: "",
    }
    // Options for medium (art type)
    const MEDIUM_OPTIONS = [
        { value: "Canvas and Fabric", label: "Canvas and Fabric" },
        { value: "Mixed Media", label: "Mixed Media" },
        { value: "Digital Photography", label: "Digital Photography" },
        { value: "NFT", label: "NFT" },
        { value: "Oil and acrylic on canvas", label: "Oil and acrylic on canvas" },
    ]
    // Options for dimensions (art size)
    const DIMENSION_OPTIONS = [
        { value: "Small (up to 12x12 inches)", label: "Small (up to 12x12 inches)" },
        { value: "Medium (13x13 to 24x24 inches)", label: "Medium (13x13 to 24x24 inches)" },
        { value: "Large (25x25 to 36x36 inches)", label: "Large (25x25 to 36x36 inches)" },
        { value: "Extra Large (37x37 to 48x48 inches)", label: "Extra Large (37x37 to 48x48 inches)" },
        { value: "Oversized (larger than 48x48 inches)", label: "Oversized (larger than 48x48 inches)" },
    ]
    // Allowed image extensions
    const VALID_IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp"]

    // Add this constant after other constants
    const ALLOWED_HOSTS = [
        "example.com",
        "images.pexels.com",
        "www.pexels.com",
        "localhost",
        "art-market-next-js.vercel.app",
        "imgur.com",
        "i.imgur.com",
        "googleusercontent.com",
        "drive.google.com",
        "dropbox.com",
        "dropboxusercontent.com",
        "amazonaws.com",
    ]
    // Text for allowed hosts, to be presented to the user.
    const ALLOWED_HOSTS_MESSAGE =
        "Allowed image hosting providers:\n" +
        "• Imgur (imgur.com)\n" +
        "• Pexels (pexels.com)\n" +
        "• Google Drive (drive.google.com)\n" +
        "• Dropbox (dropbox.com)\n" +
        "• Amazon S3 (amazonaws.com)\n" +
        "Image must end with: .jpg, .jpeg, .png, .gif, or .webp"

    return { INITIAL_FORM_STATE, MEDIUM_OPTIONS, DIMENSION_OPTIONS, VALID_IMAGE_EXTENSIONS, ALLOWED_HOSTS, ALLOWED_HOSTS_MESSAGE }
}

export default createNewConstants
