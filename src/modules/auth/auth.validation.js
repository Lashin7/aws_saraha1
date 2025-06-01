// register schema
import joi from "joi"
import { genders } from "../../DB/models/user.model.js"

export const register = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required().valid(joi.ref("password")),
    userName: joi.string().min(5).max(19).required(),
    phone: joi.string().required(),
    gender: joi.string().valid(...Object.values(genders)).required(),
    /////////////////////////////////////
    /// ObjectId 
    id:joi.custom((value,helper)=>{
        //checks
        if(value > 20) return true
        return helper.message("id must be greater than 20!")


    })

}).required()
// login schema
export const login = joi.object({
    email: joi.string().email().required(),
    password:joi.string().required()

}).required()
// any endpoint recevives data has a schema