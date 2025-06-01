import { Schema, model, Types } from "mongoose"
// schema
const messageSchema = new Schema({
    content: { type: String, required: true },
    sender: { type: Types.ObjectId, ref: "User", required: true },
    recevier: { type: Types.ObjectId, ref: "User", required: true },
},
    // join query
    // on student.courseId = course.id 

    {
        timestamps: true
    })


//model
export const Message = model("Message", messageSchema);