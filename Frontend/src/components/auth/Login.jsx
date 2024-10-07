import React, { useState } from "react";
import Navbar from "../Shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Link ,useNavigate} from "react-router-dom";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
function Signup() {
    const [input, setInput] = useState({
        email: "",
        password: "",
    });

    const {loading,setLoading}=useSelector(store=>store.auth)
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const changevalueHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler=async (e)=>{
        e.preventDefault();
        try{
            dispatch(setLoading(true));
            const res= await axios.post(`${USER_API_ENDPOINT}/login`,input,{
                header:{
                    "Content-Type":"application/json",
                },
                withCredentials:true,
            });
            if(res.data.success){
                navigate("/login"); 
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
                    className="w-1/2 border border-gray-200 rounded-md p-4 m-10"
                >
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold mx-2 mb-5">
                            Log<span className="text-[rgb(248,48,2)]">in</span>
                        </h1>
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
                        <Label htmlFor="password">Password:</Label>
                        <Input
                            type="password"
                            name="password"
                            value={input.password}
                            onChange={changevalueHandler}
                            placeholder="Enter Password:"
                        />
                    </div>
                    {
                        loading? <Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait</Button> : <Button type="submit" className="w-full my-4">Login</Button>
                    }
                    <span className="text-sm items-center">
                        <div className="mx-auto max-w-3xl">
                            Dont have an Account? <Link to="/signup" className="text-blue-400">Signup</Link>
                        </div>
                    </span>
                </form>
            </div>
        </div>
    );
}

export default Signup;
