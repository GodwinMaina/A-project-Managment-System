import express from 'express'
import cron from 'node-cron'
import { welcomeUser } from './mailservices/welcome'

const app = express()

const run = async () => {
    cron.schedule('*/5 * * * * *', async () => {
        console.log('checking for a new user');

        await welcomeUser()
    })
}
// const running = async () => {
//     cron.schedule('*/50 * * * * *', async () => {
//         console.log('checking for a new task');

//         await welcomeUser()
//     })
// }

run()

app.listen(4200, () => {
    console.log("server running ...");
})