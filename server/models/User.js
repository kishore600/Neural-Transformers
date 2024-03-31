import mongoose from "mongoose";

const Schema = mongoose.Schema

const userSchema =  new Schema({
    username : {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    favCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Course",
        default:[{}]
    }],
    
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
},{timestamps:true})

const User = mongoose.model('User',userSchema)

export default User