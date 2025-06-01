import mongoose from "mongoose";
const connectDB = async()=>{
    await mongoose.connect(process.env.CONNECTION_URI)
    .then(()=>{console.log(`DB is connected successfully`)})
    .catch((error)=>{console.log(`DB is failed to be connected ${error.message}`)})
}
export default connectDB;
