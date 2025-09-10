import { JwtPayload } from "jsonwebtoken";
import { Express, Request } from 'express';
declare global{
    namespace Express{
        export interface Request{
            userId?:string|JwtPayload
        }
        export interface Decoded{
            userId?:string|JwtPayload
        }
    }
}