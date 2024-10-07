import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User2, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
    const user = false;
    return (
        <div className="bg-white shadow-sm">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
                <div className="bg-white">
                    <h1 className="text-2xl font-bold mx-2">
                        Job<span className="text-[#F83002]">Portal</span>
                    </h1>
                </div>
                <div className="flex items-center gap-12">
                    <ul className="flex font-medium items-center gap-5">
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={'/job'}>Jobs</Link></li>
                        <li>Browse</li>
                    </ul>
                    {!user ? (
                        <div className="flex items-center gap-2">
                            <Link to="/login"><Button variant="outline">Login</Button></Link>
                            <Link to="/signup"><Button className="bg-[#6A38C2]">Signup</Button></Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" className="flex items-center space-x-2 p-1">
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage
                                            src="https://images.pexels.com/photos/27779028/pexels-photo-27779028/free-photo-of-a-view-of-a-small-town-on-the-water-with-mountains-in-the-background.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                                            alt="Hardik"
                                        />
                                    </Avatar>
                                    <span className="font-medium">React-Hardik</span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-64 p-0 shadow-lg rounded-md overflow-hidden">
                                <div className="bg-[#6A38C2] text-white p-4">
                                    <h4 className="font-semibold">React-Hardik</h4>
                                    <p className="text-sm text-gray-200">Lorem ipsum dolor sit amet.</p>
                                </div>
                                <div className="p-2">
                                    <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100 transition-colors">
                                        <User2 className="mr-2 h-4 w-4" />
                                        View Profile
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100 transition-colors">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Logout
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;