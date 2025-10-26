import { API_ENDPOINTS } from "./apiEndpoints.js";

const CLOUDINARY_UPLOAD_PRESET = "budgetbee";

const uploadProfileImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(API_ENDPOINTS.UPLOAD_IMAGE, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Image upload failed: ${errorData.error.message || response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Image uploaded successfully..", data);
    return data.secure_url; // Return the URL of the uploaded image
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
export default uploadProfileImage;
