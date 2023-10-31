import { Router } from "express";
import * as controller from "./controller.js";

const router=Router();

router.route("/adduser").post(controller.addUser);


export default router;