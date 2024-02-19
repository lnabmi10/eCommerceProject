const cloudinary = require('cloudinary')
cloudinary.config({
    
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KAY, 
  api_secret: process.env.API_SECRET 
});

const coudinaryUploadImg = async (fileToUpload, publicId) => {
    try {
      const result = await cloudinary.uploader.upload(fileToUpload, {
        resource_type: "auto",
        public_id: publicId  // Specify public_id if provided
      });
  
      console.log(result); // Output the result to the console if needed
  
      return {
        url: result.secure_url,
        public_id: result.public_id
      };
    } catch (error) {
      throw new Error(error.message);
    }
  };
  

module.exports = coudinaryUploadImg


