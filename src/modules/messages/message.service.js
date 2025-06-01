import { asyncHandler } from "../../utils/error handling.js/asyncHandler.js";
import { Message } from "../../DB/models/message.model.js";
import { User } from "../../DB/models/user.model.js"
import { flags } from "./message.validation.js";
// create
export const sentMessage = asyncHandler(async (req, res, next) => {
    const { recevier, content } = req.body;
    // check rec existence
    const user = await User.findById(recevier);
    if (!user) return next(new Error(" Recevier not existed", { cause: 400 }));
    // create message
    await Message.create({ recevier, content, sender: req.user._id }) // blnsba la sender ma3nah an lw msh mawgod 7ot req.user._id

    return res.status(200).json({ success: true, message: "Message send successfully" })

});
// get single
export const getSingleMessage = asyncHandler(async (req, res, next) => {
    const { user } = req
    const { id } = req.params;
    const message = await Message.findById(id);
    // check if current user is recevier or sender
    // id >> string
    // _id >> objectId
    // id comes from request string
    // _id from database is objectID
    if (message.recevier.toString() != user._id.toString() || message.sender.toString() != user._id.toString()) {
        return next(new Error("Is not authorized ", { cause: 401 }))

    }
    return res.status(200).json({ success: true, data: { message } })

})
// get all
export const getAllMessages = asyncHandler(async (req, res, next) => {
    const { flag } = req.query;// inbox, outbox
    let results;
    if (flag == flags.inbox) {
        results = await Message.find({ recevier: req.user._id });
    } else {
        results = await Message.find({ sender: req.user._id })
    }

    return res.status(200).json({ success: true, results })
})
//update
// delete
