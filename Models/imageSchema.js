import { model, Schema } from "mongoose";


const imageSchema = new Schema({
    userid:{type:Schema.Types.ObjectId,ref:"users"},
    url:{type:String,required:true},
    postion:{type:Number,required:true}
})


const imageModel = model('images',imageSchema)

export default imageModel