import express from "express";
import Jwt  from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import { createUserSchema , signInSchema,roomSchema} from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import { User } from '../../../packages/db/src/generated/prisma/index';
import { data } from "motion/react-client";


const app=express();
app.use(express.json())
const port=3001;
app.post('/signup',async (req,res)=>{
    const parsedData=createUserSchema.safeParse(req.body)
    if(!parsedData.success){
        return res.json({
            message:"Wrong credentials"
        })
    }
    try{
            await prismaClient.User.create({
             data:{
                email:parsedData.data?.userName,
                password:parsedData.data?.password,
                name:parsedData.data?.name
            
                }   
    })
    }catch(e){
        res.status(411).json({
            message:"User already exist with these credentials"
        })
    }
    res.json({
        userId:123
    })
})
app.post('/signin',(req,res)=>{
    const data=signInSchema.safeParse(req.body)
    if(!data.success){
        return res.json({
            message:"Wrong credentials"
        })
    }
    const userId=1;
    const token=Jwt.sign({
        userId,

    },JWT_SECRET)
    res.json({
        token
    })
})
app.post('/room',middleware,(req,res)=>{
    const data=roomSchema.safeParse(req.body)
    if(!data.success){
        return res.json({
            message:"Wrong credentials"
        })
    }
    res.json({
        roomId:123
    })
})
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})