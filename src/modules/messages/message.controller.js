import {Router} from "express";
import { asyncHandler } from "../../utils/error handling.js/asyncHandler.js";
import isAuthenticated from "../../../middleware/authentication.js";
import isAuthorized from "../../../middleware/authorization.js";
import endPoints from "./message.endpoint.js";
import validation from "../../../middleware/validation.middleware.js";
import *as messageSchema from "./message.validation.js"
import *as messageService from "./message.service.js"
const router = Router();
// create
router.post("/",isAuthenticated,isAuthorized(endPoints.sendMessage),validation(messageSchema.sentMessage),messageService.sentMessage)

// get single
router.get("/:id",isAuthenticated,isAuthorized(endPoints.getSingleMessage),validation(messageSchema.getSingleMessage),messageService.getSingleMessage)
// get all
router.get("/",isAuthenticated,isAuthorized(endPoints.getAllMessages),validation(messageSchema.getAllMessages),messageService.getAllMessages)
//update
// delete


export default router;