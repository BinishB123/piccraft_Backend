import { v2 as cloudinary } from "cloudinary";
import { configDotenv } from "dotenv";
configDotenv()



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (file, folder = "piccraft") => {
    const date = new Date
  const uniqueId = `piccraftImages_${date.getTime()}`;
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      `data:image/jpeg;base64,${file.file.toString("base64")}`,
      {
        folder: folder,
        public_id: uniqueId,
        resource_type: "image",
      }, 
      (error, result) => { 
        if (error) {
          console.error("Error uploading to Cloudinary:", error);
          return reject({ success: false, message: "Upload failed" });
        }
        resolve({ success: true, url: result?.secure_url });
      }
    );
  });
};


const cloudinaryUpload = {
    uploadToCloudinary
}

export default cloudinaryUpload