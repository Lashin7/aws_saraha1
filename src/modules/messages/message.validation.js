import joi from "joi";
import { Types } from "mongoose";
import { isValidObjectId } from "../../../middleware/validation.middleware.js";

export const sentMessage = joi.object({
    content: joi.string().required(),
    recevier: joi.custom(isValidObjectId).required()
}).required()
export const getSingleMessage = joi.object({
    id: joi.custom(isValidObjectId).required() // de el data el wa7ed el gaya fa b valid if it's objectID or not

}).required()
export const flags ={
    inbox:"inbox",
    outbox:"outbox"
}
export const getAllMessages = joi.object({
    flag:joi.string().valid(...Object.values(flags))// cuz valid method accepts only array
}).required()