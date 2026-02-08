import { v2 as cloudinary } from "cloudinary";
import { type UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export const uploadImageToCloudinary = async (image: File): Promise<string> => {
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const uploadResult = await new Promise<UploadApiResponse>(
    (resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "posts" },
        (error, result) => {
          if (error || !result) {
            reject(error || new Error("Cloudinary upload failed"));
            return;
          }
          resolve(result);
        },
      );
      uploadStream.end(buffer);
    },
  );

  return uploadResult.secure_url;
};
