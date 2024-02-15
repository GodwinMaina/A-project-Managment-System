
import express,  {NextFunction, Request, Response, json} from 'express'
import router from './routes/adminRoutes'

import bodyParser from 'body-parser';
import cors from 'cors';
// import { userInfo } from 'os';



const app = express()

app.use(json())
 app.use(cors());

 app.use(bodyParser.urlencoded({ extended: false }));

 app.use(express.urlencoded({ extended: true }));

 
app.use(router)


// app.use("/signup",router)
// app.use("/login",router)
// app.use("/taskCreate",router)


app.use((error: Error, req: Request, res: Response, next: NextFunction)=>{
    res.json({
        message: error.message
    })
    next()
})


let port = 5000;

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`); 
})