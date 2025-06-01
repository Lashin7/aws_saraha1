import { roles } from "../../DB/models/user.model.js"
const endPoints = {
    sendMessage: [roles.user],
    getSingleMessage:[roles.user],
    getAllMessages:[roles.user]
}
export default endPoints;
