import CourseModel from "./course.schema.js";
export default class CourseRepository {
    // write your code logic here
    async getCoursesData() {
        try {
            const allCourse = await CourseModel.find();
            return allCourse
        } catch (error) {
            throw new Error(
                "Something went wrong while fetching student data from database",
                500
            );
        }
    }

    async addCourse(newCourse) {
        console.log(newCourse);
        try {
          const courseData = new CourseModel(newCourse);
          await courseData.save();
          return courseData;
        } catch (error) {
          throw new Error(
            "Something went wrong while adding student to database",
            500
          );
        }
      }

}
