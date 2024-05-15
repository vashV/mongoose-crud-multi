import mongoose from 'mongoose'
const { Schema, model } = mongoose;
// import {UserSchema} from '../user/user.model.mjs'

export const StorySchema = new Schema({
    title  : { type : String, required : true },
    body   : { type : String, required : true },
    author : { type: Schema.Types.ObjectId, ref:'user'},
    // author : UserSchema,
}, {timestamps:true});
  
export default model('story',StorySchema);