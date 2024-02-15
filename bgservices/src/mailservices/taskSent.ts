
import mssql from 'mssql'
import dotenv from 'dotenv'
import { sqlConfig } from '../config/config'
import ejs from 'ejs'
import { sendMail } from '../helpers/emailhelper'

dotenv.config()

export const welcomeUser = async () => {
    const pool = await mssql.connect(sqlConfig)

    const taskAssignees = (await pool.request().execute("taskAssign")).recordset

    console.log(taskAssignees);

    for (let taskAssignee of taskAssignees) {
        ejs.renderFile('Template/taskSent', { userName: taskAssignee.userName }, async (error, data) => {
            let mailOptions = {
                from: "wangaripauline303@gmail.com",
                to: taskAssignee.email,
                subject: "Welcome to PangaProjo",
                html: data
            }

            try {
                await sendMail(mailOptions)

                await pool.request().query('UPDATE Users SET isAssigned = 1 WHERE isAssigned = 0 AND isDeleted = 0')

                console.log("Email for new task sent");

            } catch (error) {
                console.log(error);

            }
        })
    }
}

