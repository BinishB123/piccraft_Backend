


const addImage = async(req,res,next)=>{
    try {
        const {id} = req.body
        
    } catch (error) {
        next(error)
    }
}


const imageContoller = {
    addImage
}