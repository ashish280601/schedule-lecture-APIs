import express from "express";
import userRouter from "./src/features/users/user.router.js";

const router = express.Router();



router.get('/', (req, res) => {
    return res.status(200).json({
        message: "Welcome to lecture scheduling APIs",
        status: 200,
        success: true
    })
})

router.use('/auth', userRouter)




// middlware if router not found
router.use((req, res) => {
    return res.status(404).json({
        message: "API's not found",
        status: false
    });
})

export default router;