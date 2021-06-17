import mongoose from 'mongoose';

const collegeSchema=mongoose.Schema({
    college:String,
    collegedepartment:String,
})

export default mongoose.model("college",collegeSchema);