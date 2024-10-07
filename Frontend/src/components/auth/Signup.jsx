import React, { useState } from "react";
import Navbar from "../Shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { toast } from 'sonner'
import { useDispatch,useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
function Signup() {
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        role: "",
        file: "",
    });

    const {loading}=useSelector(store=>store.auth)
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const changevalueHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };
    const changefileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };
    const submitHandler=async (e)=>{
        e.preventDefault();
        const formData= new FormData();
        formData.append("name",input.name);
        formData.append("email",input.email);
        formData.append("phoneNumber",input.phoneNumber);
        formData.append("password",input.password);
        formData.append("role",input.role);
        if(input.file){
            formData.append("file",input.file);
        }
        try{
            dispatch(setLoading(true));
            const res= await axios.post(`${USER_API_ENDPOINT}/register`,formData,{
                header:{
                    "Content-Type":"multipart/form-data",
                },
                withCredentials:true,
            });
            if(res.data.success){
                navigate("/login"); //lagrenge
                toast.success(res.data.message);
            }
        }catch(error){
            console.log("Register::Problem Sending Data")
        }finally{
            dispatch(setLoading(false));
        }
    }
    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <form
                onSubmit={submitHandler}
                    action=""
                    className="w-1/2 border border-gray-200 rounded-md p-4 m-10"
                >
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold mx-2 mb-5">
                            Sign<span className="text-[rgb(248,48,2)]">Up</span>
                        </h1>
                    </div>
                    <div className="my-2">
                        <Label htmlFor="name">Name:</Label>
                        <Input
                            type="text"
                            name="name"
                            value={input.name}
                            onChange={changevalueHandler}
                            placeholder="Enter Name:"
                        />
                    </div>
                    <div className="my-2">
                        <Label htmlFor="email">Email:</Label>
                        <Input
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={changevalueHandler}
                            placeholder="Enter Email:"
                        />
                    </div>
                    <div className="my-2">
                        <Label htmlFor="phoneNumber">PhoneNo:</Label>
                        <Input
                            type="text"
                            name="phoneNumber"
                            value={input.phoneNumber}
                            onChange={changevalueHandler}
                            placeholder="Enter PhoneNo:"
                        />
                    </div>
                    <div className="my-2">
                        <Label htmlFor="password">Password:</Label>
                        <Input
                            type="password"
                            name="password"
                            value={input.password}
                            onChange={changevalueHandler}
                            placeholder="Enter Password:"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <RadioGroup className="flex items-center gap-4 my-5" >
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    checked={input.role === "Applicant"}
                                    value="Applicant"
                                    onChange={changevalueHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1">Applicant</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    checked={input.role === "Recruiter"}
                                    value="Recruiter"
                                    onChange={changevalueHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className="flex item-centre gap-2">
                            <Label className="m-2 pt-1">Profile:</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changefileHandler}
                                placeholder="Enter Profile:"
                            />
                        </div>
                    </div>
                    {
                        loading? <Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait</Button> : <Button type="submit" className="w-full my-4">Signup</Button>
                    }
                    <span className="text-sm items-center">
                        <div className="mx-auto max-w-3xl">
                            Already Have  an Account? <Link to="/login" className="text-blue-400">Login</Link>
                        </div>
                    </span>
                </form>
            </div>
        </div>
    );
}

export default Signup;
