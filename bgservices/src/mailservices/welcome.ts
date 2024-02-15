import mssql from 'mssql'
import dotenv from 'dotenv'
import { sqlConfig } from '../config/config'
import ejs from 'ejs'
import { sendMail } from '../helpers/emailhelper'
dotenv.config()  

// EMAIL: "wangaripauline303@gmail.com",
// EMAIL_PASSKEY: "sspvenqhbjoimwvd"

export const welcomeUser = async () => {
    const pool = await mssql.connect(sqlConfig)

    const users = (await pool.request().execute("WelcomeExisting")).recordset

    console.log(users);

    for (let user of users) {
        ejs.renderFile('template/welcomeUser.ejs', { userName: user.userName }, async (error, data) => {
            let mailOptions = {
                from: "wangaripauline303@gmail.com",
                to: user.email,
                subject: "Welcome to PangaProjo",
                html: data
            }

            try {
                await sendMail(mailOptions)

                await pool.request().query('UPDATE Users SET isWelcomed = 1 WHERE isWelcomed = 0 AND isDeleted = 0')

                console.log("Emails sent to new users");

            } catch (error) {
                console.log(error);

            }
        })
    }
}

