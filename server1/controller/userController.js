require('dotenv').config()
const User = require('../model/users');
const bcryptjs = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { format } = require('path');



///////////////// this api is created for adding data //////////
///////////////// response time of this api is 593ms////////////
exports.createUser = (req, res, next) => {
    // console.log(req.body)
    const { name, username } = req.body;
    User.findOne({ username: username })
        .then(user => {
            if (!user) {
                const userdata = new User();
                userdata.name = name;
                userdata.username = username;
                return userdata.save()
                    .then(saved => {
                        if (saved) {
                            return res.status(200).send(JSON.stringify({
                                message: "Data Added",
                                data: user
                            }))
                        }
                        return res.status(401).send(JSON.stringify({
                            message: "Data not saved"
                        }))
                    })

            }
            else {
                return res.status(401).send(JSON.stringify({
                    message: "User Already Exist"
                }))
            }
        })
        .catch(err => {
            return res.status(500).send(JSON.stringify({
                message: "Error Occured"
            }))
        })
}

///////////////// api for updateing data and creating data with the help of upsert function //////////
///////////////// response time of this api is 377ms for update data////////////
///////////////// response time of this api is 523ms for create data////////////
exports.updateData = async (req, res, next) => {
    // console.log(req.body)
    try {
        const { name, username } = req.body;
        const updatedUser = await User.findOneAndUpdate({ username: username }, { name: name }, { upsert: true })

        if (updatedUser) {
            return res.status(200).json({
                message: "Data updatedUser",
                data: updatedUser
            })
        }
        else {
            return res.status(200).json({
                message: "New Record added"
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
exports.getUsers = (req, res, next) => {
    User.find()

        .then(data => {
            if (data) {
                return res.status(200).send(JSON.stringify({
                    message: "All Data",
                    data: data
                }))
            }
            else {
                return res.status(200).send(JSON.stringify({
                    message: "No Record Found"
                }))
            }
        })
        .catch(err => {
            console.log(err)
            return res.status(500).send(JSON.stringify({
                message: "Error Occured"
            }))
        })
}