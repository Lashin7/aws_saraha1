import jwt from "jsonwebtoken";
export const generateToke = ({ payload, signature = process.env.JWT_SECRET }) => {
    return jwt.sign(payload, signature)
}
export const verfiyToken = ({ token, signature = process.env.JWT_SECRET,options={} }) => {
    return jwt.verify(token, signature,options)
}