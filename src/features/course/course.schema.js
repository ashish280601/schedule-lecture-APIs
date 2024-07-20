import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    level: {

        type: String,   
        enum: ['Beginner', 'Intermediate ', 'Advanced', 'Expert'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const CourseModel = mongoose.model('Courses', courseSchema);

export default CourseModel;