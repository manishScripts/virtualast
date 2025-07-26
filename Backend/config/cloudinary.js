import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (filepath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

   try{
    const uploadResult = await cloudinary.uploader
       .upload(filepath)
       console.log(uploadResult);
       fs.unlinkSync(filepath);      // delete the file from the server after uploading to cloudinary SYNCHRONOUSLY UNLINK THE FILE
    return uploadResult.secure_url;
    }catch(error){
     fs.unlinkSync(filepath);
     return res.status(500).json({message: "Error uploading file to cloudinary", error: error.message});
   }
  
}