const Company=require('../models/companyModel')
exports.registerCompany= async(req,res)=>{
    try{
        const {companyName}=req.body;
        if(!companyName){
            return res.status(400).json({
                success:false,
                message:"Company Name is required"
            })
        }

        let company=await Company.findOne({name:companyName});
        if(company){
            return res.status(400).json({
                success:false,
                message:`Company with name ${companyName} already exists`
            })
        }

        company=await Company.create({
            name:companyName,
            userId:req.id
        })
        return res.status(200).json({
            success:true,
            message:`Company ${companyName} created successfully`
        })
    }catch(err){
        console.log(err);
    }
}

exports.getCompany=async(req,res)=>{
    try {
        const userId=req.id;
        const companies=await Company.find({userId:userId});
        if(!companies){
            return res.status(404).json({
                success:false,
                message:`Companies not found`
            })
        }
        return res.status(200).json({
            success:true,
            companies
        })
    } catch (error) {
        console.log(err);
    }
}

exports.getCompanybyId=async(req,res)=>{
    try {
        const companyId=req.params.id;
        const company=await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                success:false,
                message:`Company not found`
            })
        }

        return res.status(200).json({
            success:true,
            company
        })
    } catch (error) {
        console.log(err);
    }
}

exports.updateCompany= async(req,res)=>{
    try {
        const {name,description,website,location}=req.body;
        const file=req.file;

        const updateData={name,description,website,location};
        const company=await Company.findByIdAndUpdate(req.params.id,updateData,{new:true});
        if(!company){
            return res.status(404).json({
                success:false,
                message:`Company not found`
            })
        }
        return res.status(200).json({
            success:true,
            company
        })
    } catch (error) {
        console.log(err);
    }
}