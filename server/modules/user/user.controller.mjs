import express from "express"
import * as user_service from "./user.service.mjs"
import raw from "../../middleware/route.async.wrapper.mjs"

const router = express.Router()
router.use(express.json())

// CREATES A NEW USER
router.post("/", raw (async (req, res) => {
     const user = await user_service.create_user(req.body);
     res.status(200).json(user);
}))

// GET ALL USERS       
router.get("/"    , raw( async (req, res) => { 
  const users = await user_service.get_all_users();
  res.status(200).json(users);
}))

// GETS USER BY ID
router.get("/:id" , raw( async (req, res) => {
  const user = await user_service.get_user_by_id(req.params.id)
  if (!user) return res.status(404).json({ status: "No user found." });
  res.status(200).json(user);
})) 

// UPDATE USER BY ID
router.put("/:id" , raw( async (req, res) => {
  const user = await user_service.update_user_by_id(req.params.id,req.body);
  res.status(200).json(user);
}))

// DELETE USER BY ID
router.delete( "/:id" , raw( async (req, res) => {
  const user = await user_service.delete_user_by_id(req.params.id);
  if (!user) return res.status(404).json({ status: "No user found." });
  res.status(200).json(user);
}))

// alternatively you could write:
//----------------------------------

router.route("/") 
    // CREATES A NEW USER
    .post(raw(async (req, res) => {
      const user = await user_service.create_user(req.body);
      res.status(200).json(user);
    }))
    // GET ALL USERS    
    .get(raw(async (req, res) => { 
      const users = await user_service.get_all_users();
      res.status(200).json(users);
    }))

router.route("/:id") 
    // GETS USER BY ID
    .get(raw(async (req, res) => {
      const user = await user_service.get_user_by_id(req.params.id)
      if (!user) return res.status(404).json({ status: "No user found." });
      res.status(200).json(user);
    })) 
    // UPDATE USER BY ID 
    .put(raw(async (req, res) => {
      const user = await user_service.update_user_by_id(req.params.id,req.body);
      res.status(200).json(user);
    }))
    // DELETE USER BY ID
    .delete(raw(async (req, res) => {
      const user = await user_service.delete_user_by_id(req.params.id);
      if (!user) return res.status(404).json({ status: "No user found." });
      res.status(200).json(user);
    }))


export default router;
