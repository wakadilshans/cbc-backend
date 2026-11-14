import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    email: {
        type: String,
        required: true,   //not be black
        unique: true       //can't be same emails in the db,hve only one //looks like primary key
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    isBlocked: {
        type: Boolean,
        default: false
    },

    type: {
        type: String,
        default: "customer"
    },

    profilePicture: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },


})

const User = mongoose.model("users", userSchema)
export default User;