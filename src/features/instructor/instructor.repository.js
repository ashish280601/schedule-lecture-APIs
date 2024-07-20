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

  async addInstructor(req, res) {
    try {
      const { name, email, depart } = req.body;
      const newInstructor = new Instructor({ name, email });
      await newInstructor.save();
      res.status(201).json(newInstructor);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  };

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
