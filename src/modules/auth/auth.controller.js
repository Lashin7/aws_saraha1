import { Router } from "express";
import *as authService from "./auth.serivce.js"
import *as authSchemas from "./auth.validation.js"
import { asyncHandler } from "../../utils/error handling.js/asyncHandler.js";
import validation from "../../../middleware/validation.middleware.js";
const router = Router();

// register
router.post("/register", validation(authSchemas.register), asyncHandler(authService.register));


// login
router.post("/login", validation(authSchemas.login), asyncHandler(authService.login))
// acctivate account
router.get("/authenticate_account/:token", asyncHandler(authService.acctivateAccount));


export default router;