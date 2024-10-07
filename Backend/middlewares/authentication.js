const jwt = require('jsonwebtoken')
exports.isAuthenticated=async (req,res,next)=>{
    try{
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({
                success:false,
                message:"User not Authenticated"
            })
        }

        const decode= await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                success:false,
                message:"Invalid token"
            })
        }

        req.id=decode.userId;
        next();
    }catch(err){
        console.log(err);
    }
}

