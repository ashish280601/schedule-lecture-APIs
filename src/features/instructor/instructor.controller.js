import InstructorRepository from "./instructor.repository.js";
export default class InstructorController {
    constructor() {
        this.instructorRepository = new InstructorRepository();
    }

    async getAllInstructors(req, res) {
        try {
            const allInstructors = await this.instructorRepository.getAllInstructor();
            if (!allInstructors) {
                return res.status(400).json({
                    data: {
                        allInstructors,
                        message: "Instructor data not found",
                        status: 400,
                        success: true
                    }
                })
            }
            return res.status(200).json({
                data: {
                    allInstructors,
                    message: "Instrutor data fetch successfully",
                    status: 200,
                    success: true
                }
            })
        } catch (error) {
            console.log("Error while showing students", error);
            return res.status(500).json({
                data: {
                    data: {},
                    message: "Something went wrongs",
                    status: 500,
                    success: false
                }
            });
        }
    }

    async addInstructorDetails(req, res) {
        try {
            const { name, email, department } = req.body;
            // Basic validation
            if (!name || !email || !department === 'undefined') {
                return res.status(400).json({
                    message: `${name} || ${email} || ${department} field is required`,
                    status: 400,
                    success: false
                });
            }

            const newUser = {
                name, email, department
            };
            const instructor = await this.instructorRepository.addInstructor(newUser);
            console.log(instructor);
            if (!instructor) {
                return res.status(400).json({
                    data: {
                        instructor,
                        message: "Failed to add instructor",
                        status: 400,
                        success: false
                    }
                })
            }
            return res.status(200).json({
                data: {
                    instructor,
                    message: "Intructor added successfully",
                    status: 200,
                    success: true
                }
            })
        } catch (error) {
            console.log("Error while adding student", error);
            if (error.message == "Something went wrong while adding student to database") {
                return res.status(400).json({
                    data: {
                        data: {},
                        message: "Instructor with this email already present",
                        status: 400,
                        success: false
                    }
                });
            } else {
                return res.status(500).json({
                    data: {
                        data: {},
                        message: "Something went wrongs",
                        status: 500,
                        success: false
                    }
                });
            }
        }
    }
}
