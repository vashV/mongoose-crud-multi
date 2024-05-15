import express from "express"
import log from '@ajar/marker'
import raw from "../../middleware/route.async.wrapper.mjs"
import * as story_service from "./story.service.mjs"

const router = express.Router()
router.use(express.json())

// router.post(   "/"          , story_service.create_story);           
// router.get(    "/"          , story_service.get_all_stories); 
     
// router.get(    "/user/:id"  , story_service.get_user_stories); 

// router.get(    "/:id"       , story_service.get_story_by_id);  
// router.put(    "/:id"       , story_service.update_story);    
// router.delete( "/:id"       , story_service.delete_story);        

router.route("/") 
    .post(raw(async (req, res) => { // CREATES A NEW STORY
      log.obj(req.body, "create a story, req.body:");
      const story = await story_service.create_story(req.body, req.body.author);
      res.status(200).json(story);
    }))
    .get(raw(async ( _ , res) => { // GET ALL STORIES
      const stories = await story_service.get_all_stories();
      res.status(200).json(stories);
    }))

router.get("/user/:id", raw( async (req, res) => { // GET ALL STORIES OF A USER
  const user = await story_service.get_user_stories(req.params.id);
  res.status(200).json(user);
})) 


router.route("/:id") 
    .get(raw(async (req, res) => { // GETS STORY BY ID
      const story = await story_service.get_story_by_id(req.params.id)
      if (!story) return res.status(404).json({ status: "No story found." });
      res.status(200).json(story);
    })) 
    .put(raw(async (req, res) => { // UPDATE STORY BY ID 
      const story = await story_service.update_story_by_id(req.params.id,req.body);
      res.status(200).json(story);
    }))
    .delete(raw(async (req, res) => { // DELETE STORY BY ID
      const story = await story_service.delete_story_by_id(req.params.id);
      if (!story) return res.status(404).json({ status: "No story found." });
      res.status(200).json(story);
    }))

export default router;