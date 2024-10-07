const cookieParser = require('cookie-parser');
const express=require('express');
const cors=require('cors');
const app=express();
const dotenv=require('dotenv')
const dbconnect=require('./utils/db')
const userRoute=require('./routes/userRoutes')
const companyRoute=require('./routes/companyRoutes')
const jobRoute=require('./routes/jobRoutes')
const applicationRoutes=require('./routes/applicationRoutes')
dotenv.config({})

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions={
    origin: 'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions))

const PORT= process.env.PORT 

app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoutes);

app.listen(PORT,()=>{
    dbconnect();
    console.log(`Server running at ${PORT}`);
})
