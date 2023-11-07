import { Router } from "express";
import Auth from "./middleware/Auth.js";
import * as controller from "./controller.js";

const router=Router();

router.route("/adduser").post(controller.addUser);
router.route("/login").post(controller.login);
router.route("/home").get(Auth,controller.home);


export default router;