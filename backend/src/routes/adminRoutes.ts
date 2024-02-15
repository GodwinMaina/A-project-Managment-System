import{Router} from "express";
import {signupUser, createTask, getAllProjects,getOneUser,getUsers,updateUser, deleteUser, getUserTasks }  from "../controllers/adminControllers";
import { verifyToken } from "../middleware/verifyToken";
import { checkUserDetails, loginUser, resetPassword} from "../authentication/auth";


const router = Router();

//router for signup  user page
router.post('/signup', signupUser);


//ROUTER FOR GETTING USER login
router.post('/login',loginUser);


///router at admin page
router.get('/projects', verifyToken, getAllProjects)


// All users
router.get('/', getUsers);

//display task as per user name 
router.get('/userTask', getUserTasks)
//router.get('/userTask',  verifyToken, getUserTasks)

// getting one user by id
router.get('/:id', verifyToken, getOneUser);


router.get('/task')

// update user
router.put('/update/:id', updateUser);

// delete user
router.delete('/delete/:id', deleteUser);


router.put('/reset_pwd', resetPassword)




//Admin CreateTask
router.post('/createTask', createTask)


//ROUTER FOR GET PROJECTS
router.get('/projects',getAllProjects);


//update password
// router.put('/resetPassword', resetPassword)


router.post('/auth/login', loginUser)
router.post('/auth/checkdetails', verifyToken, checkUserDetails)
router.put('/auth/reset_pwd', resetPassword)






export default router;

 