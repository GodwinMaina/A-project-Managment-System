import mssql from 'mssql';
import { User } from "../interface/User";
import { sqlConfig } from '../config/sqlConfig';
import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import { v4 } from 'uuid';
import bcrypt from 'bcrypt'

import { registerUserValidator } from '../validators/signUpValidater';

const SECRET = 'Q45gt23crfe';

const users: User[] = [];


//signUp user
export const signupUser = async (req: Request, res: Response) => {
    try {
    
        const { userName, email, password } = req.body;
        const id = v4();

      
        const hashPwd = await bcrypt.hash(password,6)

        let {error} = registerUserValidator.validate(req.body) 
        if(error){
            return res.status(404).json({
                error: error.details[0].message
            })
        }


        if (!password) {
            return res.status(400).json({
                error: "Password is required"
            });
        }
        const emailExists = await checkIfEmailExists(email);
        if (emailExists) {
            return res.status(400).json({
                error: 'Email is already registered',
            });
        }

        const pool = await mssql.connect(sqlConfig);

        const userSign = (await pool.request()
        .input("user_id", mssql.VarChar, id)
        .input("userName", mssql.VarChar, userName)
        .input("email", mssql.VarChar, email)
        .input("Password", mssql.VarChar, hashPwd)
        .execute('registerUser')
    ).rowsAffected;

        console.log(userSign);

        if (userSign) {
            return res.json({
                message: "Account created successfully",
              
            });
        } else {
            return res.json({ error: "An error occurred while." });
        }
    } catch (error) {
        console.error("Error creating user:", error);
        return res.json({ error: " The user account was not created." });
    }


    async function checkIfEmailExists(email: string): Promise<boolean> {
        const pool = await mssql.connect(sqlConfig);

        const result = await pool
            .request()
            .input('email', mssql.VarChar, email)
            .query('SELECT COUNT(*) AS count FROM Users WHERE email = @email');

        return result.recordset[0].count > 0;
    }
};


export const createTask = async (req: Request, res: Response) => {
    try {
        const { taskName, taskType, description, startDate, endDate, select } = req.body;

        const id =v4();

        const pool = await mssql.connect(sqlConfig);

        const result = await pool.request()
            .input("task_id", mssql.VarChar, id)
            .input("taskName", mssql.VarChar, taskName)
            .input('taskType', mssql.VarChar, taskType)
            .input('description', mssql.VarChar, description)
            .input('startDate', mssql.VarChar, startDate)
            .input('endDate', mssql.VarChar, endDate)
            .input('assignee', mssql.VarChar, select)
            .execute('createTasks');

        if (result.rowsAffected[0] === 1) {
            const userResult = await pool.request()
                .input('assignee', mssql.VarChar, select)
                .query('SELECT email FROM Users WHERE userName = @assignee');
            
            const userEmail = userResult.recordset[0]?.email || ''; 

            await pool.request()
                .input("task_id", mssql.VarChar, id)
                .input("taskName", mssql.VarChar, taskName)
                .input('taskType', mssql.VarChar, taskType)
                .input('description', mssql.VarChar, description)
                .input('startDate', mssql.VarChar, startDate)
                .input('endDate', mssql.VarChar, endDate)
                .input('email', mssql.VarChar, userEmail)
                .execute('UserTasks');
            
            return res.json({
                message: "Task created successfully and UserTask table updated."
            });
        } else {
            return res.status(500).json({ error: "An error occurred while creating the task." });
        }
    } catch (error) {
        console.error("Error creating task:", error);
        return res.status(500).json({ error: "An error occurred while creating the task." });
    }
};
// ...................end of task create...............



///get Allprojects from the db
export const getAllProjects = async (req: Request, res: Response) => {

    try {
       const pool = await mssql.connect(sqlConfig);
    
        //query to fetch FROM TASKS TABLE
        const result = await pool.query('SELECT * FROM TASKS');
        res.json(result.recordset);
    }

        catch (error) {
            console.error("error can fetch from the Table");
            res.status(500).send('Server Error');
        }
};

///...................END OF GET ALL PROJECTS.........................




//...................... GET ALL USERS..............

export const getUsers = async (req: Request, res: Response) => {
    try {
        const pool = await mssql.connect(sqlConfig);
        const allusers = (
            await pool
                .request()
                .query('SELECT *FROM Users')
        ).recordset;

        return res.status(200).json({
            users: allusers,
        });
    } catch (error) {
        return res.json({ error });
    }
};

export const getOneUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const pool = await mssql.connect(sqlConfig);

        const user = (
            await pool
                .request()
                .input('user_id', id)
                .execute('getOneUser')
        ).recordset;

        return res.json({
            user,
        });
    } catch (error) {
        return res.json({ error });
    }
};



export const updateUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { userName, email, Password }: User = req.body;

        const pool = await mssql.connect(sqlConfig);

        const result = (
            await pool
                .request()
                .input('user_id', id)
                .input('userName', mssql.VarChar, userName)
                .input('email', mssql.VarChar, email)
                .input('Password', mssql.VarChar, Password)
                .execute('updateUser')
        ).rowsAffected;

        console.log(result);

        return res.status(200).json({
            message: 'User updated successfully',
        });
    } catch (error) {
        return res.json({ error });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const pool = await mssql.connect(sqlConfig);

        const result = (
            await pool
                .request()
                .input('user_id', mssql.VarChar, id)
                .query("DELETE FROM Users WHERE user_id = @user_id")
        ).rowsAffected;

        console.log(result[0]);

        if (result[0] === 0) {
            return res.status(201).json({
                error: 'User not found',
            });
        } else {
            return res.status(200).json({
                message: 'Account deleted successfully',
            });
        }
    } catch (error) {
        return res.json({ error });
    }
};





///..........get Task for each user .........................

interface DecodedToken {
    email: string;
    // Add other properties if needed
}
export const getUserTasks = async (req: Request, res: Response) => {
    let userEmail = ''
    const token = req.headers['authorization'] as string 
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
          console.error('Invalid token:', err);

          return;
        }
        console.log(decoded);
        
        userEmail = decoded?.email; 
        
      });

    
    
try {
    const pool = await mssql.connect(sqlConfig);
 
     //query to fetch FROM TASKS TABLE
    //  const result = await pool.query('SELECT * FROM TASKS ');

    const result = await pool.query(`SELECT * FROM UserTask WHERE email = '${userEmail}'`)

    //  const result = await pool.query('SELECT * FROM UserTask');

     res.json(result.recordset);

     
 }

     catch (error) {
         console.error("error can fetch from the Table");
         res.status(500).send('Server Error');
     }

}





