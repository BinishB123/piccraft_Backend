import cloudinaryUpload from "../helpers/cloudinary.js";
import sharpImages from "../helpers/sharp.js";
import CustomError from "../middleware/customErrorHandler.js";
import imageRepo from "../repository/imageRepo.js";

const addImages = async (files, imageDatas, id) => {
  try {
    const sharpedImages = await Promise.all(
      imageDatas.map(async (data, index) => {
        if (data.crop) {
          return await sharpImages(files[index], data);
        }
        return { file: files[index].buffer };
      })
    );
    const uploadedImages = await Promise.allSettled(
      sharpedImages.map((data) => cloudinaryUpload.uploadToCloudinary(data))
    );
    const response = await imageRepo.maxPositionNumber(id);
    await imageRepo.addImage(
      uploadedImages,
      imageDatas,
      response,
      id
    );
    const latestImages = await imageRepo.getLatestImages(id)
    return latestImages
  } catch (error) {
    throw new CustomError(error.message, error.statusCode);
}
};


const getLatestImages = async(id,skip)=>{
    try {
        const response = await imageRepo.getLatestImages(id,skip)
        return response
    } catch (error) {
        throw new CustomError(error.message, error.statusCode);

    }
}

const deleteAnImage = async(id,userid)=>{
  try {
     await imageRepo.deleteImage(id)
     const response = await imageRepo.getLatestImages(userid)
      return response
  } catch (error) {
    throw new CustomError(error.message, error.statusCode);

  }

}


const changeTittleName = async(id,newName)=>{
  try {
     const response = await imageRepo.changeTittleName(id,newName)
     return response
  } catch (error) {
    throw new CustomError(error.message, error.statusCode);

  }
}


const imageService = {
  addImages,
  getLatestImages,
  deleteAnImage,
  changeTittleName
};

export default imageService;
