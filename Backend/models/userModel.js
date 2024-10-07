const mongoose=require('mongoose');
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:20
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:Number,
        required:true,
        maxLength:10
    },
    role:{
        type:String,
        enum:['Applicant','Recruiter'],
        required:true
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String},  //URL to resume
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId,ref:'Company'},
        profilePhoto:{
            type:String,
            default:""
        }
    }
},{timestamps:true});

module.exports = mongoose.model('User',userSchema);