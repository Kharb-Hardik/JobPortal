const Job=require('../models/jobModel');

exports.postJob=async(req,res)=>{
    try {
        const {title,description,requirements,salary,location,jobType,experience,position,companyId}=req.body;
        const userId=req.id;

        if(!title||!description||!salary||!requirements||!location||!jobType||!experience||!position||!companyId){
            return  res.status(400).json({ 
                success:false,
                message:"Please fill all the fields"
            });
        }

        const job= await Job.create({
            title:title,
            description,
            salary:Number(salary),
            requirements,
            location,
            jobType,
            experienceLevel:Number(experience),
            position:Number(position),
            company:companyId,
            createdBy:userId
        })

        return res.status(200).json({
            success:true,
            message:"Job posted successfully",
            job
        })
    } catch (err) {
        console.log(err);
    }
}

exports.getAllJob=async(req,res)=>{
    try{
        const keyword=req.query.keyword ||"";
        const query={
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}}
            ]
        }
        const jobs=await Job.find(query).populate({path:'company'}).sort({createdAt:-1});
        if(!jobs){
            return  res.status(404).json({ 
                success:false,
                message:"Jobs not found"
            });
        }
        return  res.status(200).json({ 
            success:true,
            jobs
        });

    }catch(err){
        console.log(err);
    }
}

exports.getJobbyId=async(req,res)=>{
    try{
        const {jobId}=req.params.id;
        const job=await Job.findById(jobId);
        if(!job){
            return  res.status(404).json({ 
                success:false,
                message:"Job not found"
            });
        }
        return  res.status(200).json({ 
            success:true,
            job
        });
    }catch(err){
        console.log(err);
    }
}

exports.getAdminJobs=async(req,res)=>{
    try{
        const adminId=req.id;
        const jobs=await Job.find({createdBy:adminId});
        if(!jobs){
            return  res.status(404).json({ 
                success:false,
                message:"No Posted Jobs found"
            });
        }
        return  res.status(200).json({
            success:true,
            jobs
        })
    }catch(err){
        console.log(err);
    }
}