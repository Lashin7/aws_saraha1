import { Schema, model } from "mongoose";
export const genders = {
    male: "male",
    female: "female"
}
export const roles = {
    user: "user",
    admin: "admin"
}
// if gender == "male" // xx wrong to avoid hard coding
// if gender ==genders.male // right to refer your callled value to a centralized value
Object.values(genders);
// Object.keys(genders)
const userSchema = new Schema({
    userName: { type: String, minLength: 5, maxLength: 19, required: true, unique: true },
    email: {
        type: String, required: true, unique: [true, "email already existed"], lowerCase: true,
        validate: {
            validator: (value) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value),
            message: (props) => `${props.value} is not a valid email format`,
        }
    },
    password: { type: String, required: true },
    isConfirmed: { type: Boolean, default: false },
    gender: { type: String, enum: Object.values(genders) },
    phone: { type: String, required: true },
    role: { type: String, enum: Object.values(roles), default: roles.user }


}, {
    timestamps: true
}
)

export const User = model("user", userSchema);