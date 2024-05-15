import mongoose from 'mongoose'
// import { UserSchema } from '../user/user.model.mjs';
const { Schema, model } = mongoose

export const MeetingSchema = new Schema({
    topic  : { type : String, required : true },
    starts : { type : Date, default: Date.now },
    participants : [{ type: Schema.Types.ObjectId, ref:'user'}],
    // participants : [ UserSchema ],
}, {timestamps:true});
  
export default model('meeting',MeetingSchema);