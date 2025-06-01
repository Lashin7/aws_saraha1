import nodemailer from "nodemailer";
const sendEmails = async ({ to, subject, html }) => {
    // sender

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL, // gmail email
            pass: process.env.PASS // password xxx >> app password
        }
    })
    // receiver 
    const info = await transporter.sendMail({
        from: `Saraha Application <3 <${process.env.EMAIL}>`,
        to,
        subject,
        html
    })
    // if(info.rejected.length==0) return false
    // return true

    return info.rejected.length == 0 ? true : false; // it would not be sufficient for a single  but if you send to multiple maybe you would want to know which email is not selected
    // for mutliple receipents
    // const failedEmails = info.rejected.length>0? info.rejected:null;
    // return failedEmails;

}
export const subject = {
    register:"Acctivate Account",
    resetPass:"Rest Password"
}

export default sendEmails;