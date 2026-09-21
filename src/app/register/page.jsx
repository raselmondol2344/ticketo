"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { 
    Card, 
    CardHeader, 
    CardContent as CardBody, 
    Input, 
    Button, 
    Label, 
    Form, 
    Select, 
    SelectTrigger, 
    SelectValue, 
    SelectIndicator, 
    SelectPopover, 
    ListBox, 
    ListBoxItem 
} from "@heroui/react";
import { FaUser, FaEnvelope, FaLock, FaImage, FaGoogle } from "react-icons/fa";
import Logo from "@/components/Logo";

export default function RegisterPage() {

     const { register, handleSubmit } = useForm()

     const onSubmit = (data) =>{
        console.log(data)
     }
    return (
       <div>
         <Card className="w-full max-w-lg border border-white/5 bg-slate-950/70 backdrop-blur-xl shadow-2xl p-4 mx-auto">
            <CardHeader className="flex flex-col gap-1 items-center pb-6 text-center">
                <Logo />
                <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-pink-500 bg-clip-text text-transparent">
                    Create an Account
                </h1>
                <p className="text-slate-400 text-sm mt-1">
                    Join Ticketo to book premium events or host your own organization.
                </p>
            </CardHeader>
            <CardBody className="gap-4">
                <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
                    {/* Full Name */}
                    <div className="flex flex-col gap-1 w-full">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="flex items-center bg-slate-900/50 border border-white/10 rounded-xl px-3 hover:border-pink-500/50 focus-within:!border-pink-500">
                            <FaUser className="text-slate-400 text-sm mr-2 flex-shrink-0" />


                            <Input
                            {...register("name", { required: "Name is Requried"})}
                                id="name"
                                placeholder="John Doe"
                                className="w-full bg-transparent border-none outline-none text-white h-11"
                            />

                        </div>
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col gap-1 w-full">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="flex items-center bg-slate-900/50 border border-white/10 rounded-xl px-3 hover:border-pink-500/50 focus-within:!border-pink-500">
                            <FaEnvelope className="text-slate-400 text-sm mr-2 flex-shrink-0" />


                            <Input
                            {...register("email", { required: "Email is Requried"})}
                                id="email"
                                placeholder="john@example.com"
                                type="email"
                                className="w-full bg-transparent border-none outline-none text-white h-11"
                            />
                        </div>
                    </div>

                    {/* Profile Image URL */}
                    <div className="flex flex-col gap-1 w-full">
                        <Label htmlFor="image">Profile Image URL</Label>
                        <div className="flex items-center bg-slate-900/50 border border-white/10 rounded-xl px-3 hover:border-pink-500/50 focus-within:!border-pink-500">
                            <FaImage className="text-slate-400 text-sm mr-2 flex-shrink-0" />



                            <Input
                            {...register("image", { required: "Image is Requried"})}
                                id="image"
                                placeholder="https://example.com/avatar.jpg"
                                className="w-full bg-transparent border-none outline-none text-white h-11"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1 w-full">
                        <Label htmlFor="password">Password</Label>
                        <div className="flex items-center bg-slate-900/50 border border-white/10 rounded-xl px-3 hover:border-pink-500/50 focus-within:!border-pink-500">
                            <FaLock className="text-slate-400 text-sm mr-2 flex-shrink-0" />


                            <Input
                            {...register("password", { required: "Password is Requried"})}
                                id="password"
                                placeholder="••••••••"
                                type="password"
                                className="w-full bg-transparent border-none outline-none text-white h-11"
                            />
                        </div>
                    </div>

                    {/* Select Role */}
                    <div className="flex flex-col gap-2 w-full">
                        <Label htmlFor="role" className="text-sm font-semibold text-slate-300">Select Role</Label>


                        <select
                        {...register("role", { required: "Role is Requried"})}
                            id="role"

                            className=" w-full bg-slate-900/50  border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 p-3"


                            
                           
                        >
                            <option value="attendee">
                                Attendee
                            </option>
                            
                            <option value="organizer">
                                Organaizer
                            </option>

                            
                           
                        </select>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold h-12 shadow-lg shadow-pink-500/10 hover:shadow-pink-500/20"
                        radius="lg"
                    >
                        Create Account
                    </Button>
                </Form>

                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-white/5" />
                    <span className="mx-4 text-xs text-slate-500 font-semibold uppercase">Or Sign Up With</span>
                    <div className="flex-grow border-t border-white/5" />
                </div>

                <Button
                    variant="bordered"
                    className="w-full border-white/10 hover:bg-white/5 hover:border-white/20 text-white font-semibold h-11 flex items-center justify-center gap-2"
                    radius="lg"
                >
                    <FaGoogle className="text-pink-500" />
                    Google OAuth
                </Button>

                <p className="text-center text-sm text-slate-400 mt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="text-pink-500 hover:text-pink-400 font-semibold hover:underline">
                        Log In
                    </Link>
                </p>
            </CardBody>
        </Card>
       </div>
    );
}