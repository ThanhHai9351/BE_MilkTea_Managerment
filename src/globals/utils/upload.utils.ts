import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { BadRequestException } from '../middlewares/error.middleware';
export const upload = multer({ dest: 'uploads/' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadMainImage(filePath: string): Promise<string> {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'products',
    });

    return result.secure_url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new BadRequestException('Failed to upload image');
  }
}
