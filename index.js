const express = require('express');
const app = express();
const {connection} = require('./db');
const {userRoute} = require('./route/user.route')
const {auth} = require('./middleware/auth.middleware')
const {postRoute} = require('./route/post.route')
const cors = require('cors')

app.use(cors)
app.use(express.json())
app.use('/users',userRoute)

app.use(auth)

app.use('/posts',postRoute)


app.listen(8080,async()=>{
    try {
        await connection
        console.log('connected to DB')
    } catch (error) {
        console.log(error)
    }
    console.log("server is running port 8080")
})