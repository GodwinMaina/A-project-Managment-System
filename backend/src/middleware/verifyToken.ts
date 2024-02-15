import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User, loginUserDetails } from "../interface/User";
dotenv.config()

const SECRET = 'Q45gt23crfe';

export interface ExtendedUserRequest extends Request{
    info?: loginUserDetails
}

export const verifyToken = (req:ExtendedUserRequest, res: Response, next: NextFunction) =>{
    try {
        const token = req.headers['authorization'] as string

        console.log( req.headers);
        

        if(!token){
            return res.json({
                message: "You do not have access"
            })
        }

        const data = jwt.verify(token, SECRET) as loginUserDetails

        req.info = data
        
    } catch (error) {
        return res.json({
            error: error
        })
    }

    next()
}