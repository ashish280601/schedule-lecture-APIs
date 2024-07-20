import express from "express";
import CourseController from "./course.controller.js";
import uploads from "../../middlewares/fileUpload.js";

const courseRouter = express.Router();

const courseController = new CourseController();

courseRouter.post('/add', (req, res, next) => {
    uploads.single('image')(req, res, (err) => {
        if (err) {
            // Handle multer errors and send JSON response
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
        // Proceed with the controller logic if no errors
        courseController.addCourseData(req, res);
    });
});

courseRouter.get('/', (req, res) => {
    courseController.getAllCourse(req, res)
})

export default courseRouter
