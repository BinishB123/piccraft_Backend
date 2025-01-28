import Express from 'express'
import authController from '../controller/authController.js'
const authRouter = Express.Router()

authRouter.post('/signup',authController.addUser)




export default authRouter