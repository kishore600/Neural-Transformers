import User from "../models/User.js"
import asyncHandler from 'express-async-handler'
import jwtToken from '../jwtToken.js'
import bcrypt from "bcrypt"

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findOne({_id:req.params.id}).populate('favCourses')
  
    if (user) {
      res.json(user)
    } else {
      res.status(404)
      throw new Error('User not found') 
    }
})

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findOne({_id:req.params.id}).populate('favCourses') 
  
  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      favCourses: user.favCourses,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404).json('User not found');
  }
});



const getAllUser = asyncHandler(async(req,res)=>{
  const user = await User.find().populate("favCourses")
  if (user) {
    res.json(user)
  } else {
    res.status(404).json('User not found')
}})

const updateUserProfile = asyncHandler(async (req, res) => {
  try {
      const user = await User.findById(req.params.id).populate('favCourses');
      if (user) {
          user.username = req.body.username || user.username;
          user.email = req.body.email || user.email;
          user.favCourses = req.body.favCourses || user.favCourses
          user.isAdmin = req.body.isAdmin

          if (req.body.password) {
              const salt = await bcrypt.genSalt();
              user.password = await bcrypt.hash(req.body.password, salt);
          }

          const updatedUser = await user.save();

          res.json({
              _id: updatedUser._id,
              username: updatedUser.username,
              email: updatedUser.email,
              isAdmin: updatedUser.isAdmin,
              favCourses: updatedUser.favCourses,
              token: jwtToken(updatedUser._id),
          });
      } else {
          res.status(404);
          throw new Error('User not found');
      }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id)
  
    if (user) {
      res.json({ message: 'User removed' })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
})


export {getUserProfile,getUserById,updateUserProfile,deleteUser,getAllUser}