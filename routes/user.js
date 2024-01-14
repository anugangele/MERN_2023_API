import express from 'express'
import { isAuthenticated } from '../middleware/auth.js';
import {logout,userLogin,userRegister,getMyProfile} from '../controllers/user.js'

const router=express.Router();


   
   router.post('/register',userRegister)

   router.post('/login',userLogin)
   
        // /api/users/logout
   router.get('/logout',logout)

   router.get('/myprofile',isAuthenticated,getMyProfile)
   export default router