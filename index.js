import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Student from './models/student.js';
import studentRouter from './routers/studentRouter.js';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import jwt from "jsonwebtoken"

const app = express();

const mongoUrl = "mongodb+srv://majexticofficial_db_user:TxP0EUr09H0B9bg1@cluster0.iwncqiw.mongodb.net/"

mongoose.connect(mongoUrl, {})
const connection = mongoose.connection;
connection.once("open", () => {    //when data base open once shows msg data base connected
    console.log("database connected");
})

app.use(bodyParser.json())  //use to read all request from using bodyparser midleware. catch the rq from json 

//create read to token middleware
app.use(
    (req, res, next) => {
        //next()  //apu rq eka next gelepena kenta meya ywanaw-send for routes
        // console.log(req.header("authorization")?.replace("Bearer", "")) //replace bearer tag with blank, to only get the token
        const token = req.header("Authorization")?.replace("Bearer ", "") // Bearer means token represent tag
        console.log(token)

        if (token != null) {   //if token not null
            jwt.verify(token, "cbc-secret-key", (error, decoded) => {  //decrypted token by key
                if (!error) {  //if not error
                    //console.log(decoded) //shows the decoded user details
                    req.user = decoded   //attach rq for dedcoded details for user.now user use decoded details
                    //you can view user details from every request
                }
            })
        }
        next()//apu rq eka next gelepena router kenta meya ywanaw-

    }
)

app.use("/api/students", studentRouter)
app.use("/api/products", productRouter)
app.use("/api/users", userRouter)

app.listen(
    3000,
    () => {
        console.log('server is running on port 3000');
    }
)
