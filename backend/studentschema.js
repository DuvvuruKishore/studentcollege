import mongoose from 'mongoose';

const valueSchema=mongoose.Schema({
    student:String,
    rollno:Number,
    department:String,
    college:String,
})

export default mongoose.model("contacts",valueSchema);