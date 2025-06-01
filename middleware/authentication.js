import { User } from "../src/DB/models/user.model.js";
import jwt from "jsonwebtoken";
import { verfiyToken } from "../src/utils/token/token.js";

const isAuthenticated = async (req, res, next) => {
    try {
        // who are you? ahmed
        // the user already has logged in, thus I will not ask for a cosnt {_id}=req.body
        // a token has sent while logging to the from frontend
        const { authorization } = req.headers; // headers is object has keys and values ,, by convention we called the key of the token >> authorization 
        // Here I need to check if it has a bearer and also
        if (!authorization || !authorization.startsWith("Bearer"))
            return next(new Error("Token required"), { cause: 404 })
        // const { authorization} = req.headers; // bearer,<token>,qf
        const token = authorization.split(" ")[1] //[Bearer, token] >> token
        const { id } = verfiyToken({ token })
        const user = await User.findById(id).select("-password").lean(); // to lean and clain the mongoose doument to one plain
        if (!user)
            return next(new Error("User not found"), { cause: 404 })
        req.user = user;
        return next();
    } catch (error) {
        return next(error)
    }

}
export default isAuthenticated;