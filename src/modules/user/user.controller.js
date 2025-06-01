import { Router } from "express";
import *as userService from "./user.service.js";
import { User } from "../../DB/models/user.model.js";
import jwt from "jsonwebtoken"
import isAuthenticated from "../../../middleware/authentication.js"
import isAuthorized from "../../../middleware/authorization.js";
import {roles} from "../../DB/models/user.model.js"
import endPoints from "./user.endpoints.js"
const router = Router();

router.post("/", userService.createUser);
// router.get("/:id",userService.findUser);

// user 
router.get("/profile",isAuthenticated,isAuthorized(endPoints.profile), userService.profile);
// router.get("/",userService.findAllusers);
// router.patch("/:id",userService.updateUser);
// router.delete("/:id",userService.deleteUser);
export default router;