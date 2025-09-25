import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
export interface AuthRequest extends Request {
  user?: { id: number;role: string };
}

export const authMiddleware = (req:AuthRequest,res:Response,next:NextFunction)=>{
const token = req.headers.authorization?.split(" ")[1];
if(!token){
    return res.status(401).json({error: "Unauthorized"})
}

try {
    const decoded = jwt.verify(token,'secret') as {
        id:number,
        role : string
    }
    req.user = decoded
    next()
} catch (error:any) {
    console.log(error);
    res.status(401).json({error: "Invalid token"})
}
}
export const requireAdmin = (req:AuthRequest,res:Response,next:NextFunction)=>{
if(req.user?.role !== 'admin'){
    return res.status(403).json({error : 'Admin privileges required'})
}
next()
}