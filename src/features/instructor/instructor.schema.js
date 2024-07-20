import mongoose from "mongoose";

const InstructorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    department:{
        type: String,
        required: true
    }
})


const InstructorModel = mongoose.model("Instructor", InstructorSchema);

export default InstructorModel;