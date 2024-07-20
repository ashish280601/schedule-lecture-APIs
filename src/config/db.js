import mongoose from "mongoose";

const db = async () => {
    try {
        mongoose.connect(process.env.MongoDB_URI)
        console.log("Mongoose is connected to database");
    } catch (error) {
        console.error("Error while connecting with database", error);
        process.exit();
    }
}

export default db;