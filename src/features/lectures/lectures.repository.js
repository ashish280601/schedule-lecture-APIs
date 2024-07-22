import mongoose from "mongoose";
import LectureModel from "./lectures.schema.js";
export default class LectureRepository {
    // write your code logic here

    // Get all lectures using aggregation
    async getAllLectures(req, res) {
        try {
            const lectures = await LectureModel.aggregate([
                {
                    $lookup: {
                        from: 'courses',
                        localField: 'course',
                        foreignField: '_id',
                        as: 'courseDetails'
                    }
                },
                {
                    $unwind: '$courseDetails'
                },
                {
                    $lookup: {
                        from: 'instructors',
                        localField: 'instructor',
                        foreignField: '_id',
                        as: 'instructorDetails'
                    }
                },
                {
                    $unwind: '$instructorDetails'
                },
                {
                    $project: {
                        _id: 1,
                        date: 1,
                        startTime: 1,
                        endTime: 1,
                        'courseDetails.name': 1,
                        'courseDetails.level': 1,
                        'courseDetails.description': 1,
                        'courseDetails.image': 1,
                        'instructorDetails.name': 1,
                        'instructorDetails.email': 1,
                        'instructorDetails.department': 1,
                    }
                }
            ]);
            return lectures
        } catch (error) {
            throw new Error(error.message);
        }
    };

    async addLecture(lectureData) {
        try {
            const lecture = new LectureModel(lectureData);
            return await lecture.save();
        } catch (error) {
            console.error("Error while adding lecture", error);
            throw new Error("Error while adding lecture");
        }
    };

    // async findOverlappingLecture(instructorId, date, startTime, endTime) {
    //     try {
    //         const start = new Date(date);
    //         const end = new Date(date);

    //         // Set the time for start and end
    //         start.setHours(startTime.getHours(), startTime.getMinutes(), startTime.getSeconds());
    //         end.setHours(endTime.getHours(), endTime.getMinutes(), endTime.getSeconds());

    //         // Find overlapping lectures
    //         return await LectureModel.findOne({
    //             instructor: new mongoose.Types.ObjectId(instructorId),
    //             date: date, // Ensure the date matches
    //             $or: [
    //                 {
    //                     // Case when existing lecture starts before and ends after the new lecture's start time
    //                     startTime: { $lt: end },
    //                     endTime: { $gt: start }
    //                 },
    //                 {
    //                     // Case when the new lecture starts before and ends after an existing lecture
    //                     startTime: { $lt: end },
    //                     endTime: { $gt: start }
    //                 }
    //             ]
    //         });
    //     } catch (error) {
    //         console.error("Error while finding overlapping lecture:", error);
    //         return null; // Return null or handle the error as needed
    //     }
    // }
    async findOverlappingLecture(instructorId, date) {
        try {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);
    
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);
    
            return await LectureModel.findOne({
                instructor: new mongoose.Types.ObjectId(instructorId),
                date: { $gte: startOfDay, $lte: endOfDay }
            });
        } catch (error) {
            console.error("Error while finding overlapping lecture:", error);
            return null; // Return null or handle the error as needed
        }
    }


}