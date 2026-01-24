import express  from "express";
const router = express.Router();
import {adduser, deleteuser, edituser, getuser, getuserbyslug} from '../controller/user'
import upload from "../middleware/filehandler";

router.get("/getuser",getuser)
router.get("/getuserbyid/:slug",getuserbyslug)
router.post("/adduser",upload.single("img"),adduser)
router.put("/edituser/:slug",upload.single("img"),edituser)
router.delete("/deleteuser/:id",deleteuser)

export default router