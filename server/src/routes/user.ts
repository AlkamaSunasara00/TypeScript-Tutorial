import express  from "express";
const router = express.Router();
import {adduser, getuser} from '../controller/user'
import upload from "../middleware/filehandler";

router.get("/getuser",getuser)
router.post("/adduser",upload.single("img"),adduser)

export default router