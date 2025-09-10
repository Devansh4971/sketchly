import express from "express";
import Jwt  from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import { createUserSchema , signInSchema,roomSchema} from "@repo/common/types";

const app=express();
const port=3001;
app.post('/signup',(req,res)=>{
    const data=createUserSchema.safeParse(req.body)
    if(!data.success){
        return res.json({
            message:"Wrong credentials"
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