const Application=require('../models/applicationModel');
const Job=require('../models/jobModel')
exports.applyJob=async(req,res)=>{
    try{
        const {userId}=req.id;
        const {jobId}=req.params.id;

        if(!jobId){
            return res.status(400).json({
                success:false,
                message:"Job for Application is required"
            })
        }
        const applied=await Application.findOne({job:jobId,applicant:userId});

        if(applied){
            return res.status(400).json({
                success:false,
                message:"Already Applied for the Job"
            })
        }

        const job=Job.findbyId(jobId);
        if(!job){
            return res.status(404).json({
                success:false,
                message:"Job not found"
            })
        }

        const newapplication=await Application.create({
            job:jobId,
            applicant:userId
        })


        job.application.push(newapplication._id);
        await job.save();
        res.status(201).json({
            success:true,
            message:"Application submitted successfully",
        })
    }catch(err){
        console.log(err);
    }
}

exports.getAppliedJob=async(req,res)=>{
    try{
        const  {userId}=req.id;
        const application=await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}}
            }
        })
        if(!application){
            return res.status(404).json({
                success:false,
                message:"No Application found"
            })
        }
        res.status(200).json({
            success:true,
            application,
            message:"Application found",
        })

    }catch(err){
        console.log(err);
    }
}

exports.getApplicants=async(req,res)=>{
    try{
        const {id:jobId}=req.params;
        const job=await Job.findById(jobId).populate({
            path:'application',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        })

        if(!job){
            return res.status(404).json({
                success:false,
                message:"No Job found"
            })
        }

        return res.status(200).json({
            success:true,
            job
        })
    }catch(err){
        console.log(err);
    }
}

exports.updateStatus=async(req,res)=>{
    try{
        const  {id:applicationId}=req.params;
        const {status}=req.body;

        if(!status){
            return res.status(400).json({
                success:false,
                message:"No status provided"
            })
        }
        const application=await Application.findById(applicationId);
        if(!application){
            return res.status(404).json({
                success:false,
                message:"No Application found"
            })
        }

        application.status=status.toLowerCase();
        await application.save();

        return res.status(200).json({
            success:true,
            message:"Status Updated"
        })

    }catch(err){
        console.log(err);
    }
}