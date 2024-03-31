// import mongoose from "mongoose";
// const Schema = mongoose.Schema

// const courseSchema = new Schema({
//     imageUrl:{
//         type:String,
//         default:'https://images.unsplash.com/photo-1503676260728-1c00da094a0b'
//     },
//     title:{
//         type:String,
//         requied:true
//     },
//     category:{
//         type:String,
//         required:[true,'Post category is required'],
//         default:'All'
//     },
//     description:{
//         type:String,
//         default:'Unknown'
//     },
//     videos:{
//         type:[String],
//         requied:true
//     }
// },{timestamps:true})

// const Course = mongoose.model('Course',courseSchema)

// export default Course

import mongoose from "mongoose";
const Schema = mongoose.Schema

const courseSchema = new Schema({
    imageUrl:{
        type:String,
        default:'https://images.unsplash.com/photo-1503676260728-1c00da094a0b'
    },
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:[true,'Post category is required'],
        default:'All'
    },
    description:{
        type:String,
        default:'Unknown'
    },
    videos: [{
        subtitle: {
            type: String,
            required: true
        },
        videoUrl: {
            type: [String],
            required: true
        }
    }]
},{timestamps:true})

const Course = mongoose.model('Course', courseSchema)

export default Course
