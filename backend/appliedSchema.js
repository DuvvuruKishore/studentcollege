import mongoose from 'mongoose';

const valueSchema=mongoose.Schema({
    college:{
        type: String,
        required: true,
       },
    department:{
        type:String,
        required: true,
       },
    gpa:{
        type: Number,
        required: true,
       },
    mail:{
        type: String,
        required: true,
       }
})

export default mongoose.model("appliedcolleges",valueSchema);