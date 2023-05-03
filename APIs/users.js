const express = require('express')
const usersApp = express.Router()
const expressAsyncHandler = require('express-async-handler')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const mclient = require('mongodb').MongoClient
const DBurl = process.env.DATABASE_CONNECTION_URL;


usersApp.use(express.json())

async function getCollection(s) {
    const client = await mclient.connect(DBurl)
    let dbObj = client.db("treasurehunt")
    let collectionObj = dbObj.collection(s)
    return collectionObj
}

//GET ALL USERS
usersApp.get('/getusers', expressAsyncHandler(async (request, response) => {
    let usersCollection = await getCollection("users")

    let usersObj = await usersCollection.find().toArray()
    response.send({ message: "all users", payload: usersObj })
}))

//create user
usersApp.post('/createuser', expressAsyncHandler(async (request, response) => {
    let userObj = request.body
    let usersCollection = await getCollection("users")
    let userObjDb = await usersCollection.findOne({ username: userObj.username })
    if (userObjDb !== null) response.send({ message: "Username already exists" })
    else {
        let hashedPassword = await bcryptjs.hash(userObj.password, 5)
        userObj.password = hashedPassword
        await usersCollection.insertOne(userObj)
        response.send({ message: "User added succesfully" })
    }
}))

//login
usersApp.post('/login', expressAsyncHandler(async (request, response) => {
    let userObj = request.body
    let usersCollection = await getCollection("users")
    let userObjDb = await usersCollection.findOne({ email: userObj.email, type : userObj.type })

    if (userObjDb == null) response.send({ message: "Wrong user name" })
    else {
        let validUser = await bcryptjs.compare(userObj.password, userObjDb.password)
        if (validUser == false) {
            response.send({ message: "incorrect password" })
        }
        else {
            let token = jwt.sign({ email: userObjDb.email }, process.env.SECRET_KEY, { expiresIn: "1d" })
            response.send(token)
        }
    }
}))

module.exports = usersApp;