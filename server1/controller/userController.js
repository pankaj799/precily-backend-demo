require('dotenv').config()
const User = require('../model/users');
const bcryptjs = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { format } = require('path');



///////////////// this api is created for adding data //////////
///////////////// response time of this api is 593ms////////////
exports.createUser = async(req, res, next) => {
    // console.log(req.body)
    try{
        const { name, username } = req.body;
        const user = await User.findOne({ username: username })
            
                if (user) {

                    return res.status(401).json({
                        message: "User Already Exist"
                    })
                }
                const userdata = await new User();
                userdata.name = name;
                userdata.username = username;
                const saved = await userdata.save();
                if (saved) {
                    return res.status(200).json({
                        message: "Data Added",
                        data: user
                    })
                }
                return res.status(401).json({
                    message: "Data not saved"
                })

    }catch(err){
            return res.status(500).json({
                message: "Error Occured"
            })

    }
}

///////////////// api for updateing data and creating data with the help of upsert function //////////
///////////////// response time of this api is 377ms for update data////////////
///////////////// response time of this api is 523ms for create data////////////
exports.updateData = async (req, res, next) => {
    // console.log(req.body)
    try {
        const { name, username } = req.body;
        const updatedUser = await User.findOneAndUpdate({ username: username }, { name: name }, { upsert: false })

        if (updatedUser) {
            return res.status(200).json({
                message: "Data updatedUser",
                data: updatedUser
            })
        }
        else {
            return res.status(401).json({
                message: "Error Occured"
            })
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Error Occured"
        })
    }

}

///////////////// api for getting all data in collection //////////
///////////////// response time of this api is 286ms ////////////
exports.getUsers = async(req, res, next) => {
    try{
       const users = await User.find();
       if (users) {
           return res.status(200).json({
               message: "All users",
               data: users
           })
       }
       else {
           return res.status(200).json({
               message: "No Record Found"
           })
       }

    }catch(err){
            return res.status(500).json({
                message: "Error Occured"
            })
        }
}