const mongoose =require('mongoose');

const dbconnect= async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");
    }catch(err){
        console.log(err);
    }
}

module.exports=dbconnect;
