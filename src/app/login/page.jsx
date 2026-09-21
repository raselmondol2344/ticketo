"use client";


import Link from "next/link";

import { Card, CardHeader, CardContent as CardBody, Input, Button, Label, Form } from "@heroui/react";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";

import React from 'react'
import Logo from "@/components/Logo";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { redirect, useRouter } from "next/navigation";

export default function loginpage() {
    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, } = useForm();



    const onSubmit = async (data) => {



        const { data: signInData, error: signInError } =
            await authClient.signIn.email({

                email: data.email,
                password: data.password,

            });

        //console.log(signInData, signInError);
        if (signInError) {
            toast.error("registation not succeed")
        }
        else {
            router.refresh();
            router.push("/");
        }
    };





    return (
        <div>
            <Card className="w-full max-w-md border border-white/5 bg-slate-950/70 backdrop-blur-xl shadow-2xl p-4 mx-auto">
                <CardHeader className="flex flex-col gap-1 items-center pb-6 text-center">
                    <Logo />
                    <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-pink-500 bg-clip-text text-transparent">
                        Welcome Back
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">
                        Access your Ticketo account and purchase event tickets.
                    </p>
                </CardHeader>
                <CardBody className="gap-4">
                    <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">

                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="email">Email Address</Label>
                            <div className="flex items-center bg-slate-900/50 border border-white/10 rounded-xl px-3 hover:border-pink-500/50 focus-within:!border-pink-500">
                                <FaEnvelope className="text-slate-400 text-sm mr-2 flex-shrink-0" />

                                <Input
                                    {...register("email", { required: "Email is Requried" })}
                                    id="email"
                                    placeholder="john@example.com"
                                    type="email"
                                    className="w-full bg-transparent border-none outline-none text-white h-11"
                                />


                            </div>
                            {errors.email && (
                                <p className="text-red-500">{errors.email.message}</p>
                            )}
                        </div>


                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="password">Password</Label>
                            <div className="flex items-center bg-slate-900/50 border border-white/10 rounded-xl px-3 hover:border-pink-500/50 focus-within:!border-pink-500">
                                <FaLock className="text-slate-400 text-sm mr-2 flex-shrink-0" />

                                <Input
                                    {...register("password", { required: "Password is Requried", })}
                                    id="password"
                                    placeholder="••••••••"
                                    type="password"
                                    className="w-full bg-transparent border-none outline-none text-white h-11"
                                />
                            </div>
                            {errors.password && (
                                <p className="text-red-500">{errors.password.message}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold h-12 shadow-lg shadow-pink-500/10 hover:shadow-pink-500/20"
                            radius="lg"
                        >
                            Sign In
                        </Button>
                    </Form>

                    <div className="flex items-center my-4">
                        <div className="flex-grow border-t border-white/5" />
                        <span className="mx-4 text-xs text-slate-500 font-semibold uppercase">Or Login With</span>
                        <div className="flex-grow border-t border-white/5" />
                    </div>

                    <Button
                        variant="bordered"
                        className="w-full border-white/10 hover:bg-white/5 hover:border-white/20 text-white font-semibold h-11"
                        radius="lg"
                        startContent={<FaGoogle className="text-pink-500" />}
                    >
                        Google Account
                    </Button>

                    <p className="text-center text-sm text-slate-400 mt-6">
                        Don t have an account?{" "}
                        <Link href="/register" className="text-pink-500 hover:text-pink-400 font-semibold hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </CardBody>
            </Card>
        </div>
    )
}
