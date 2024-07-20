import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    type: { type: String, enum: ['admin', 'user'] }
});

const UserModel = mongoose.model('Users', userSchema);


export default UserModel