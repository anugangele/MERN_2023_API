import {User} from '../Models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { generateCookie } from '../utils/feature.js'

export const userRegister=async (req, res) => {
    const{name,email,password}=req.body
    
   let user=await User.findOne({email})
   
    if(user) return res.status(404).json({
        success:false,
        message :"User Already Exist"
    })
  
   const hashPassword=await bcrypt.hash(password,10)
   
   user=await User.create({
       name,
       email,
       password:hashPassword
   }) 
   
        generateCookie(user,res,201,"User Register successfully")
   }

   export const userLogin=async (req, res) => {
    const{email,password}=req.body
    
   let user=await User.findOne({email})
    if(!user) return res.status(400).json({
        success:false,
        message :"User Not Found"
    })

    const isMatch=await bcrypt.compare(password,user.password)

    if(!isMatch) return res.status(400).json({
        success:false,
        message :"Email and Password Not Match"
    })
    generateCookie(user,res,201,'WELCOME ${user.name}')
    console.log('${user.name}')

    
   

}




export const logout=(req,res)=>
        {
            res.status(200).cookie("token","",{
                expires:new Date(Date.now())
            }).json({
                success:true,
                message:'Logout success fully'
            })
            
        }
export const getMyProfile=(req,res)=>{
    res.status(200).json({
        success:true,
        user:req.user
    })
}
