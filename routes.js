import express from "express";
import userRouter from "./src/features/users/user.router.js";
import instructorRouter from "./src/features/instructor/instructor.router.js";
import courseRouter from "./src/features/course/course.router.js";
import lectureRouter from "./src/features/lectures/lectures.router.js";
import jwtAuth from "./src/middlewares/jwt.middlewares.js";

const router = express.Router();



router.get('/', (req, res) => {
    return res.status(200).json({
        message: "Welcome to lecture scheduling APIs",
        status: 200,
        success: true
    })
})

router.use('/auth', userRouter)
router.use('/instructor',jwtAuth, instructorRouter)
router.use('/course',jwtAuth, courseRouter)
router.use('/lecture',jwtAuth, lectureRouter)




// middlware if router not found
router.use((req, res) => {
    return res.status(404).json({
        message: "API's not found",
        status: false
    });
})

export default router;