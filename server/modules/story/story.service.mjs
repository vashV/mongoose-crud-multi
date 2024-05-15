import log from '@ajar/marker'
import story_model from "./story.model.mjs"
import user_model from "../user/user.model.mjs"

// post - /api/stories/
export const create_story = async (payload,author_id) => {
    let story = await story_model.create(payload);
    log.obj(story, "created story:");
    const author = await user_model.findById(author_id);
    author.stories.push(story);
    await author.save();
    return story;
}
// get - /api/stories/
export const get_all_stories = async () => {
    const users = await story_model.find().populate('author')
    return users;
}
// get - /api/stories/user/:id
export const get_user_stories = async (user_id) => {
    const user_with_stories = await user_model.findById(user_id).populate('stories')
    return user_with_stories;
}
// get - /api/stories/:id
export const get_story_by_id = async (story_id) => {
    const story = await story_model.findById(story_id)
    return story;
}
// put - /api/stories/:id
export const update_story_by_id = async (story_id, payload) => {
    const story = await story_model.findByIdAndUpdate(story_id, payload, 
                                                     {new: true,upsert: true});
    // get author
    // find the story by the id in the stories field;
    const author = await user_model.findById(story.author);
    const filtered = author.stories.filter((s)=> s._id !== story._id);
    filtered.push(story);
    author.stories = filtered;
    await author.save();

    return story;
}
// delete - /api/stories/:id
export const delete_story_by_id = async (story_id) => {
    const story = await story_model.findByIdAndRemove(story_id);
    // get author
    // find the story by the id in the stories field;
    const author = await user_model.findById(story.author);
    const filtered = author.stories.filter((s)=> s._id !== story._id);
    author.stories = filtered;
    await author.save();
    
    return story;
}