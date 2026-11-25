import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config()

export function createUser(req, res) {

    const newUserData = req.body
    newUserData.password = bcrypt.hashSync(newUserData.password, 10) //10 means how many hashing levls, deault add 10
    //console.log(newUserData)
    const user = new User(newUserData)
    user.save().then(() => {
        res.json({
            message: "User Created"
        })
    }).catch(() => {
        res.json({
            message: "user not created"
        })
    })
}

export function loginUser(req, res) {
    //req.body.email rq eke body eke dunna email ekta user wa hoynna
    // email eken thmai filter krnne user wa
    User.find({ email: req.body.email }).then(
        //emial ekt samana users la arry ekka dla penna json wifht 
        (users) => {
            if (users.length == 0) {
                res.json({
                    message: "user is not found"
                })
            } else {
                const user = users[0] //get arry first search result
                const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password)  //compre psw with previous .gey booleans yes or true

                if (isPasswordCorrect) {   //boolean true
                    const token = jwt.sign({
                        email: user.email,
                        firstName: user.firstName, //create token using user data
                        lastName: user.lastName,              //neededd to encrpyion user data
                        isBlocked: user.isBlocked,
                        type: user.type,
                        profilePicture: user.profilePicture
                    },
                        process.env.SECRET         //token key
                    )
                    //console.log(token)
                    res.json({
                        message: "user log in",
                        token: token  //send the genarated token to user bcz user need that token for future requests


                    })
                } else {
                    res.json({     //boolean false
                        message: "you are not log in invalid password"
                    })
                }
            }
        }
    )
}

export function deleteUser(req, res) {
    User.deleteOne({ email: req.body.email }).then(() => {
        res.json({
            message: "User deleted"
        })
    })
};