import { genders, User } from "../../DB/models/user.model.js";
import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import sendEmails, { subject } from "../../utils/emails/send.emails.js";
import { signgUp } from "../../utils/emails/generateHTML.js";
import { emailEmitter } from "../../utils//emails/email.event.js";
import joi from "joi"
import { hash, compareHash } from "../../utils/hashing/hash.js"
import { generateToke } from "../../utils/token/token.js";
import { encrypt } from "../../utils/encyption/encyprtion.js";
dotenv.config();



export const register = async (req, res, next) => {

    // need only the confirmPassword for the verification not to be stored in the DB
    // there is data so NEED A VALIDATE 


    // compare


    // check password == confirmPassword
    // if (password != confirmPassword)
    //     return next(new Error("Passwords must match!", { cause: 400 }))

    // hash password
    // const hash = bcrypt.hashSync(password,process.env.ROUNDS);
    // create
    const user = await User.create({
        ...req.body,
        password: hash({ plainText: req.body.password }),
        phone: encrypt({ plainText: req.body.phone })
    }) // if the email is duplicated will throw an error below 
    // generating token
    // event emit
    emailEmitter.emit("sendEmail", req.body.email)


    return res.status(201).json({
        success: true,
        results: { user }
    });

    // to catch this error by checking the value of the error code
    // 1. check error.code == 11000 "duplicated email"
    // you had the error object from error
    // return res.status(500).json({
    //     success: false,
    //     message: error.message,
    //     stack: error.stack
    // });


}
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // check user if the email is existed
        // check password
        // const user = await User.findOne({email:password}) //xx the stored password is not plaintext but hashed
        // // results logical error cuz it gets not error
        const user = await User.findOne({ email })
        if (!user) return next(new Error("Invalid Email", { cause: 400 }))
        // to check if the account is acctivated
        if (!user.isConfirmed) return next(new Error("You should have confirmed the account before", { cause: 400 }))
        // check password =>>> password from req.body // password from DB(user.password)
        // need to verfiy by bcrypt text hash
        //    const match = bcrypt.compareSync(password,user.password); //(plain one from used put, is the password returned back from the findone())
        if (!compareHash({ plainText: password, hash: user.password })) return next(new Error("Invalid Password", { cause: 400 }))
        // generate token
        // const token = jwt.sign(
        //     {id:user._id,email: user.email},
        //     process.env.JWT_SECRET
        // )
        console.log("secret key", process.env.JWT_SECRET)


        return res.status(200).json({
            success: true,
            message: "Success login",
            token: generateToke({ payload: { id: user.id, email: user.email }, singature: process.env.JWT_SECRET })
        });

    } catch (error) {
        return next(error)

    }
}
export const acctivateAccount = async (req, res, next) => {
    try {
        //who are you
        const { token } = req.params;
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ email })
        if (!user) return next(new Error("Document not found", { cause: 400 }))

        user.isConfirmed = true;
        await user.save();
        return res.status(200).json({ success: true, message: "try to login" })

    } catch (error) {
        return next(error)
    }
}