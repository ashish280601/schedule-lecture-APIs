import LectureRepository from "./lectures.repository.js";
export default class LectureController {
    constructor() {
        this.lectureRepository = new LectureRepository();
    }

    async getLectures(req, res) {
        try {
            const lectures = await this.lectureRepository.getAllLectures();
            if (!lectures) {
                res.status(400).json({
                    data: {
                        lectures,
                        message: "Failed to fetch lectures data",
                        status: 400,
                        success: false
                    }
                });
            }
            res.status(200).json({
                data: {
                    lectures,
                    message: "Lecture data fetch successfully",
                    status: 200,
                    success: true
                }
            });
        } catch (error) {
            res.status(500).json({
                data: {
                    data: {},
                    message: error.message,
                    status: 500,
                    success: false
                }
            });
        }
    };

    async createLecture(req, res) {
        try {
            const { date, startTime, endTime } = req.body;
            const { instructor, course } = req.params;

            // Validate required fields
            if (!date || !startTime || !endTime || !instructor || !course) {
                return res.status(400).json({
                    data: {},
                    message: "Date, startTime, endTime, instructor, and course are required",
                    status: 400,
                    success: false,
                });
            }

            // Parse date and times
            const lectureDate = new Date(date);
            const lectureStartTime = new Date(`${date}T${startTime}`);
            const lectureEndTime = new Date(`${date}T${endTime}`);

            // Validate that startTime is before endTime
            if (lectureStartTime >= lectureEndTime) {
                return res.status(400).json({
                    data: {},
                    message: "startTime must be before endTime",
                    status: 400,
                    success: false,
                });
            }

            // Check for scheduling conflicts
            const overlappingLecture = await this.lectureRepository.findOverlappingLecture(
                instructor,
                lectureDate,
                lectureStartTime,
                lectureEndTime
            );

            if (overlappingLecture) {
                return res.status(400).json({
                    data: {},
                    message: `Instructor is already assigned to another lecture on ${date} during ${startTime} to ${endTime}`,
                    status: 400,
                    success: false,
                });
            }

            // Prepare new lecture data
            const newLecture = {
                date: lectureDate,
                startTime: lectureStartTime,
                endTime: lectureEndTime,
                instructor,
                course,
            };

            // Save new lecture
            const addLectureData = await this.lectureRepository.addLecture(newLecture);

            if (!addLectureData) {
                return res.status(400).json({
                    data: {},
                    message: "Failed to add lecture",
                    status: 400,
                    success: false,
                });
            }

            return res.status(200).json({
                data: addLectureData,
                message: "Lecture added successfully",
                status: 200,
                success: true,
            });
        } catch (error) {
            console.log("Error while adding lecture", error);
            return res.status(500).json({
                data: {},
                message: "An unexpected error occurred",
                status: 500,
                success: false,
            });
        }
    }




}
