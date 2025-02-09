import mongoose from "mongoose";
import CustomError from "../middleware/customErrorHandler.js";
import imageModel from "../Models/imageSchema.js";
import { statusCode } from "../constants/statusCodes.js";

const maxPositionNumber = async (userid) => {
  try {
    const [result] = await imageModel.aggregate([
      { $match: { userid: new mongoose.Types.ObjectId(userid + "") } },
      { $group: { _id: "$userid", maxPositionNumber: { $max: "$postion" } } },
    ]);

    return result ? result.maxPositionNumber : 0;
  } catch (error) {
    console.log(error.message);
    throw new CustomError(error.message, error.statusCode);
  }
};

const addImage = async (urls, imageData, maxPositionNumber, userid) => {
  try {
    let count = maxPositionNumber + 1;
    for (let i = 0; i < imageData.length; i++) {
      await imageModel.create({
        userid: userid,
        url: urls[i].value.url,
        tittle: imageData[i].title,
        postion: count,
      });
      count++;
    }
  } catch (error) {
    throw new CustomError(error.message, error.statusCode);
  }
};

const getLatestImages = async (id,skip) => {
  try {
    console.log(id); 
    
    const images = await imageModel.aggregate([
      { $match: { userid: new mongoose.Types.ObjectId(id+"") } },
      { $sort: { postion: -1 } },
       {$skip:(skip-1)*8},
      { $limit: 8 },
    ]);
    const image = await imageModel.find({userid: new mongoose.Types.ObjectId(id+"")})
    
    return {images:images ? images : [] ,count:image.length};
  } catch (error) {
    throw new CustomError(error.message, error.statusCode);
  }
};

const deleteImage = async (id) => {
  try {
    const deleted = await imageModel.deleteOne({
      _id: new mongoose.Types.ObjectId(id + ""),
    });
    if (deleted.deletedCount === 1) {
      return true;
    }

    throw new CustomError("can t delete image", statusCode.NO_CONTENT);
  } catch (error) {
    throw new CustomError(error.message, error.statusCode);
  }
};

const changeTittleName = async(id,newName)=>{
  try {
    const upadate = await imageModel.updateOne({_id:new mongoose.Types.ObjectId(id+"")},{
      $set:{tittle:newName}
    })
    if (upadate.matchedCount===0) {
      throw new CustomError('updation Failed',statusCode.INTERNAL_SERVER_ERROR)
    }
    return true
  } catch (error) {
    throw new CustomError(error.message, error.statusCode);

  }
}

const imageRepo = {
  maxPositionNumber,
  addImage,
  getLatestImages,
  deleteImage,
  changeTittleName
};

export default imageRepo;
