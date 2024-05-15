import log from '@ajar/marker'
import meeting_model from "./meeting.model.mjs"
import user_model from "../user/user.model.mjs"

// post - /api/meetings/
export const create_meeting = async (payload) => {
    let meeting = await meeting_model.create(payload);

    if('participants' in payload){
        const pending = payload.participants.map(async participant => {
            const user = await user_model.findById(participant);
            user.meetings.push(meeting);
            await user.save();
        } )
        await Promise.all(pending);
    }

    return meeting;
}
// get - /api/meetings/
export const get_all_meetings = async () => {
    const meetings = await meeting_model.find();//.populate('participants')
    return meetings;
}
// post - /api/meetings/:mid/user/:uid
export const add_participant_to_meeting = async (meeting_id, user_id) => {
    const meeting = await meeting_model.findById(meeting_id);
    const user = await user_model.findById(user_id);
    if(!meeting.participants.includes(user_id)){
        meeting.participants.push(user)
        await meeting.save()
    }
    if(!user.meetings.includes(meeting_id)){
        user.meetings.push(meeting)
        await user.save()
    }
    return meeting;
}
// get - /api/meetings/user/:id
export const get_user_meetings = async (user_id) => {
    const user = await user_model.findById(user_id).populate('meetings')
    return user.meetings;
}
// get - /api/meetings/:id
export const get_meeting_by_id = async (meeting_id) => {
    const meeting = await meeting_model.findById(meeting_id).populate('participants');
    return meeting;
}
// put - /api/meetings/:id
export const update_meeting_by_id = async (meeting_id,payload) => {
    const meeting = await meeting_model.findByIdAndUpdate(meeting_id, payload, 
                                                     {new: true,upsert: false});
    return meeting;
}
// delete - /api/meetings/:id
export const delete_meeting_by_id = async (meeting_id) => {
    const meeting = await meeting_model.findByIdAndRemove(meeting_id);
    return meeting;
}