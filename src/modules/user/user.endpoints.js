import { roles } from "../../DB/models/user.model.js"
const endPoints = {
    profile: [roles.admin, roles.user]
}
export default endPoints;