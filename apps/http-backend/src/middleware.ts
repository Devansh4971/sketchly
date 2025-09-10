import { NextFunction,Response,Request } from "express";
import Jwt, { JwtPayload } from 'jsonwebtoken';

import { JWT_SECRET } from "@repo/backend-common/config";

export interface customJwtPayload extends Jwt.JwtPayload{
    userId:string
}
export function middleware(req:Request,res:Response,next:NextFunction){
    const token=req.headers["authorization"]??" ";
 
    const decoded=Jwt.verify(token,JWT_SECRET) as customJwtPayload
    if(!decoded){
        res.status(403).json({
            message:"Unauthorized"
        })
    }else{
        req.userId=decoded.userId;
        next();
    }
    
}   