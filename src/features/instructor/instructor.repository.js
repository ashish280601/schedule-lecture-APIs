import InstructorModel from "./instructor.schema.js";
export default class InstructorRepository {
  // write your method logic here
  async getAllInstructor() {
    try {
      const allStudent = await InstructorModel.find();
      return allStudent
    } catch (error) {
      throw new Error(
        "Something went wrong while fetching student data from database",
        500
      );
    }
  }

  async addInstructor(newUser) {
    console.log(newUser);
    try {
      const user = new InstructorModel(newUser);
      await user.save();
      return user;
    } catch (error) {
      throw new Error(
        "Something went wrong while adding student to database",
        500
      );
    }
  }

}
