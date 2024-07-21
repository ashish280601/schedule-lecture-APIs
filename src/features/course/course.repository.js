import CourseModel from "./course.schema.js";
export default class CourseRepository {
  // write your code logic here
  async getCoursesData() {
    try {
      const allCourse = await CourseModel.find();
      return allCourse
    } catch (error) {
      throw new Error(
        error.message
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
        error.message,
        500
      );
    }
  }

}
