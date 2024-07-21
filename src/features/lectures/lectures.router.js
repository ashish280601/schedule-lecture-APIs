import express from "express";
import LectureController from "./lectures.controller.js";

const lectureRouter = express.Router();

const lectureController = new LectureController();

lectureRouter.post('/add/:instructor/:course', (req, res, next) => {
    lectureController.createLecture(req, res);
});

lectureRouter.get('/', (req, res) => {
    lectureController.getLectures(req, res)
})

export default lectureRouter;
