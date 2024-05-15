import mongoose from 'mongoose'
const { Schema, model } = mongoose
import {StorySchema} from '../story/story.model.mjs'
// import { MeetingSchema } from '../meeting/meeting.model.mjs'

export const UserSchema = new Schema({
    first_name  : { type : String, required : true },
    last_name   : { type : String, required : true },
    email       : { type : String, required : true },
    phone       : { type : String },
    stories     : [ StorySchema ],
    // stories     : [ { type: Schema.Types.ObjectId, ref:'story'} ],
    // meetings    : [ MeetingSchema ],
    meetings    : [ { type: Schema.Types.ObjectId, ref:'meeting'} ],
}, {timestamps:true});
  
export default model('user',UserSchema);