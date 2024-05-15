import express from "express"
import log from '@ajar/marker'
import raw from "../../middleware/route.async.wrapper.mjs"
import * as meeting_service from "./meeting.service.mjs"

const router = express.Router()
router.use(express.json())

// router.post(   "/"              , raw( _.create_meeting)    )       
// router.get(    "/"              , raw( _.get_all_meetings)  )

// router.post(   "/:mid/user/:uid", raw( _.add_participant_to_meeting) )       
// router.get(    "/user/:id"      , raw( _.get_user_meetings) ) 

// router.get(    "/:id"           , raw( _.get_meeting_by_id) ) 
// router.put(    "/:id"           , raw( _.update_meeting)      )
// router.delete( "/:id"           , raw( _.delete_meeting)      ) 

router.route("/")
        .post(raw( async (req, res) => {
            log.obj(req.body, "create a meeting, req.body:");
            let meeting = await meeting_service.create_meeting(req.body);
            res.status(200).json(meeting);
        })) 
        .get(raw(async ( _ , res) => {
            const meetings = await meeting_service.get_all_meetings();
            res.status(200).json(meetings);
        }))

// ADD USER TO MEETING
router.patch("/:meeting_id/user/:user_id", raw(async (req, res) => {
    const { meeting_id, user_id } = req.params;
    const meeting = await meeting_service.add_participant_to_meeting(meeting_id, user_id);
    res.status(200).json(meeting);
}))  
// GET USER MEETINGS
router.get("/user/:user_id", raw(async (req, res) => {
    const meetings = await meeting_service.get_user_meetings(req.params.user_id);
    res.status(200).json(meetings);
}));

router.route("/:id")
        .get(raw(async (req, res) => { // GET MEETING BY ID
            const meeting = await meeting_service.get_meeting_by_id(req.params.id)
            if (!meeting) return res.status(404).json({ status: "No meeting found." });
            res.status(200).json(meeting);
        })) 
        .put(raw(async (req, res) => { // UPDATE MEETING BY ID
            const meeting = await meeting_service.update_meeting_by_id(req.params.id,req.body)
            if (!meeting) return res.status(404).json({ status: "No meeting found to update." });
            res.status(200).json(meeting);
        } )      )
        .delete(raw(async (req, res) => { // DELETE MEETING BY ID
            const meeting = await meeting_service.delete_meeting_by_id(req.params.id)
            if (!meeting) return res.status(404).json({ status: "No meeting found to delete." });
            res.status(200).json(meeting);
        }))    

export default router;