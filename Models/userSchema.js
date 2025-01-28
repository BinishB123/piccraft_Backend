import { model, Schema } from "mongoose";

const useSchema = new Schema({
  name: { type: String, required: true },
  mobile: { type: Number, required: true },
  email: { type: Number, required: true },
  password:{type:String,required:true}
});

const userModel = model("users",useSchema)

export default userModel