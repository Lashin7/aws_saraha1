import { EventEmitter } from "events";
import jwt from "jsonwebtoken"
import sendEmails, { subject } from "../emails/send.emails.js";
import { signgUp } from "./generateHTML.js"

export const emailEmitter = new EventEmitter();

emailEmitter.on("sendEmail", async (email) => {
    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    const link = `http://localhost:3000/auth/authenticate_account/${token}`
    await sendEmails({
        to: email,
        subject: subject.register,
        html: signgUp(link)
    })
})