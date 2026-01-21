import express  from "express";
const router = express.Router();
import {adduser, edituser, getuser, getuserbyid} from '../controller/user'
import upload from "../middleware/filehandler";

router.get("/getuser",getuser)
router.get("/getuserbyid/:id",getuserbyid)
router.post("/adduser",upload.single("img"),adduser)
router.put("/edituser/:id",upload.single("img"),edituser)

export default router