import connectDB from "./DB/connection.js";
import userRouter from "./modules/user/user.controller.js"
import authRouter from "./modules/auth/auth.controller.js"
import globalErrorHandler from "./utils/error handling.js/globalErrorHandler.js";
import { notFoundHandler } from "./utils/error handling.js/notFoundHandler.js";
import messageRouter from "./modules/messages/message.controller.js"
const bootstrap = async (app, express) => {
    await connectDB();
    app.use(express.json());
    app.use("/user", userRouter);
    app.use("/auth", authRouter);
    app.use("/message",messageRouter)
    app.all("/*splat", notFoundHandler)
    app.use(globalErrorHandler)
}
export default bootstrap;