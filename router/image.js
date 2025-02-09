import Express from 'express'
import imageContoller from '../controller/imageController.js'
import upload from '../middleware/multer.js'
import verification from '../middleware/auth.js'

const imageRouter = Express.Router()

imageRouter.post('/addimages',verification(),upload.array("images"),imageContoller.addImage)
imageRouter.get('/getlatestimages/:id/:skip',verification(),imageContoller.getLatestImages)
imageRouter.delete('/deleteimage/:id/:userid',verification(),imageContoller.deleteAnImage)
imageRouter.patch('/changename',verification(),imageContoller.changeTittleName)


export default imageRouter