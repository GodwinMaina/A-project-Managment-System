import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import mssql from 'mssql'
import jwt from 'jsonwebtoken'
import { sqlConfig } from "../config/sqlConfig";
import { ExtendedUserRequest } from "../middleware/verifyToken";
import { loginUserValidator } from "../validators/loginValidater";
import { any } from "joi";

const SECRET = 'Q45gt23crfe';


export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        let { error } = loginUserValidator.validate(req.body);

        if (error) {
            return res.status(400).json({
                error: error.details[0].message
            });
        }

        const pool = await mssql.connect(sqlConfig);

        const result = await pool.request()
            .input("email", mssql.VarChar, email)
            .query(`SELECT * FROM Users WHERE email = @email`);
            
          
        // Check if any record was returned
        const user = result.recordset;

        if (!user) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        // Compare passwords
        const correctPwd = await bcrypt.compare(password,user[0].Password)
        if (!correctPwd) {
            return res.status(401).json({
                error: "Incorrect password"
            });
        }

        const loginCredentials = user.map((response: { [x: string]: any; Password: any; userName: any; })=>{
            const {Password, userName, ...rest} = response

            return rest
        })

        const token = jwt.sign(loginCredentials[0], SECRET, {
            expiresIn: '3600s'
        })


        return res.status(200).json({
            message: "Logged in successfully",
            token,
            ...loginCredentials[0]
        });

        
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
};



export const checkUserDetails = async(req: ExtendedUserRequest, res: Response)=>{
    if(req.info){
        return res.json({
            info: req.info
        })
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const pool = await mssql.connect(sqlConfig);
        const hashedPwd = await bcrypt.hash(password, 5);

        const result = (await pool.request()
            .input("email", email)
            .input("Password", hashedPwd)
            .execute("resetPassword")).rowsAffected;

        if (result[0] < 1) {
            return res.status(404).json({
                message: "User not found"
            });
        } else {
            return res.status(200).json({
                message: "Password updated successfully"
            });
        }
    } catch (error) {
        console.error('Error during password reset:', error);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
};