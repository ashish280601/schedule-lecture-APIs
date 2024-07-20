import express from "express";
import InstructorController from "./instructor.controller.js";

const instructorRouter = express.Router();

const instructorController = new InstructorController();

instructorRouter.post('/add', (req, res) => {
    instructorController.addInstructorDetails(req, res)
});

instructorRouter.get('/', (req, res) => {
    instructorController.getAllInstructors(req, res)
})

export default instructorRouter
