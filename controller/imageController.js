import imageRepo from "../repository/imageRepo.js"
import imageService from "../service/imageService.js"



const addImage = async(req,res,next)=>{
    try {
        const data = req.body
        const files = req.files
        const imageDatas = data.imageData.map((data)=>{
            return JSON.parse(data)
        })
        const response = await imageService.addImages(files,imageDatas,data.id)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error);
        
        next(error)
    }
}

const getLatestImages = async(req,res,next)=>{
    try {
        const {id,skip} = req.params
        
        const response = await imageService.getLatestImages(id,parseInt(skip))
        
        return res.status(200).json(response)
        
    } catch (error) {
        next(error)  
    }
}


const deleteAnImage = async(req,res,next)=>{
    try {
        const {id,userid} = req.params
        const response = await imageService.deleteAnImage(id,userid)
        return res.status(200).json(response)
    } catch (error) {
        next(error)
        
    }
}

const changeTittleName = async(req,res,next)=>{
    try {
      const {id,newName} = req.body
      const response = await imageService.changeTittleName(id,newName)
      return res.status(200).json(response)
    } catch (error) {
      throw new CustomError(error.message, error.statusCode);
  
    }
  }
  

const imageContoller = {
    addImage,
    getLatestImages,
    deleteAnImage,
    changeTittleName
}

export default imageContoller