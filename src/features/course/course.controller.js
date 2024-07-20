import CourseRepository from "./course.repository.js";
export default class CourseController {
    constructor() {
        this.courseRepository = new CourseRepository();
    }

    async getAllCourse(req, res) {
        try {
            const allCourseList = await this.courseRepository.getCoursesData();
            if (!allCourseList) {
                return res.status(400).json({
                    data: {
                        allCourseList,
                        message: "Courses data not found",
                        status: 400,
                        success: true
                    }
                })
            }
            return res.status(200).json({
                data: {
                    allCourseList,
                    message: "Instrutor data fetch successfully",
                    status: 200,
                    success: true
                }
            })
        } catch (error) {
            console.error("error while getting courses", error);
            return res.status(500).json({
                data: {
                    data: {},
                    message: "Something went wrongs",
                    status: 500,
                    success: false
                }
            });
        }
    };

    async addCourseData(req, res) {
        const { name, level, description } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({
                message: "Please upload a img",
                status: 400,
                success: false
            });
        }
        // Basic validation
        if (!name || !level || !description) {
            return res.status(400).json({
                message: "All field is required",
                status: 400,
                success: false
            });
        }
        try {
            const newCourse = {
                name,
                level,
                description,
                image: file.path,
              };
            const courseData = await this.courseRepository.addCourse(newCourse);
            console.log(courseData);
            if (!courseData) {
                return res.status(400).json({
                    data: {
                        courseData,
                        message: "Failed to add course",
                        status: 400,
                        success: false
                    }
                })
            }
            return res.status(200).json({
                data: {
                    courseData,
                    message: "Course added successfully",
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
                        message: "Course already present",
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
