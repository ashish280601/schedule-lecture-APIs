import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserRepository from "./users.repository.js";
export default class UserController {
    constructor() {
      this.userRepository = new UserRepository();
    }
    
    async signIn(req, res) {
      try {
        const { email, password } = req.body;
  
        const user = await this.userRepository.findByEmail(email);
  
        if (!user) {
          return res.status(400).json({
            data: {},
            message: "Invalid Email Credential",
            status: false,
          });
        } else {
          // console.log("userPassword", user.password);
          // console.log("password", password);
          const result = await bcrypt.compare(password, user.password);
          // console.log("result", result);
          if (result) {
            const token = jwt.sign(
              {
                userID: user._id,
                userEmail: user.email,
                userName: user.name,
              },
              process.env.SECRET_KEY,
              {
                expiresIn: "24hr",
              }
            );
            return res.status(200).json({
              data: {
                token,
                  userData: {
                email: user.email,
                role: user.type,
              }, 
                message: "Login Successful",
                status: true,
              },
            });
          }
          return res.status(400).json({
            data: {},
            message: "Invalid Password Credential",
            status: false,
          });
        }
      } catch (error) {
        console.log("Error while logIn", error);
        return res.status(500).json({
          data: {},
          message: "Something went wrongs while login an account",
          status: false,
        });
      }
    }
  }
  
