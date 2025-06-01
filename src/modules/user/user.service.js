import { User } from "../../DB/models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import CryptoJS from "crypto-js";
import { decrypt } from "../../utils/encyption/encyprtion.js";
dotenv.config();
export const createUser = async (req, res) => {
    try {
        // 1 new
        // const user = new User({...req.body})
        // await user.save();
        // // create
        const user = await User.create({ ...req.body })
        // insertMany
        // const users = await User.insertMany([{...req.body}])

        return user
            ? res.status(200).json({ success: true, results: { user } })
            : res.status(404).json({ success: false, message: " not be found" })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message, stack: error.stack })
    }
}
export const findUser = async (req, res) => {
    const { id } = req.params;
    try {
        // //find 
        // const user = await User.find({_id:id}); // returns empty it not exists
        // //findOne
        // const user = await User.findOne({_id:id}) // return null if not exists
        // findById
        // const user = await User.findById(id,"userName age -_id")
        const user = await User.findById(id, { userName: 1, age: 1, _id: 0 });

        return user
            ? res.status(200).json({ success: true, results: { user } })
            : res.status(404).json({ success: false, message: "document not found" })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message, stack: error.stack })
    }
}
export const profile = async (req, res) => {
    try {
        // // who are you? ahmed
        // // the user already has logged in, thus I will not ask for a cosnt {_id}=req.body
        // // a token has sent while logging to the from frontend
        // const { authorization } = req.headers; // headers is object has keys and values ,, by convention we called the key of the token >> authorization 
        // // Here I need to check if it has a bearer and also
        // if (!authorization || !authorization.startsWith("Bearer"))
        //     return res
        //         .status(404)
        //         .json({ success: false, message: "Token required!" })

        // // const { authorization} = req.headers; // bearer,<token>,qf
        // const token = authorization.split(" ")[1] //[Bearer, token] >> token

        // verfiy the token
        // const payLoad= jwt.verify(authorization,process.env.JWT_SECRET); // what I passed as a payload was the email and ID
        // const { id } = jwt.verify(authorization, process.env.JWT_SECRET);
        // const { id } = jwt.verify(token, process.env.JWT_SECRET);

        // check user
        // const user = await User.findById(id).select("-password").lean(); // to lean and clain the mongoose doument to one plain
        // if (!user)
        //     return res
        //         .status(404)
        //         .json({ success: false, message: "User not found!" })

        // newww
        // req.user = {_id,email,phone,IsConfirmed}

        // req.user = {_id, email, phone, isAcctivated,role}
        const {user} = req; 

        // to return the phone number decrypted
        const phone = decrypt({cipherText:user.phone})
        // 2 METHODS To clean the hyderated documents 1.lean() 2. const user = user.toObject() 
        return res.status(200).json({ sucess: true, results: { ...user, phone } })

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message, stack: error})

    }
}