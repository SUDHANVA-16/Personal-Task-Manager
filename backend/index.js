const express = require("express");
const app = express();
const PORT = 5000; //server at local host 5000

require('./db') //connected to database

const cors = require("cors"); // cors-cross origin resource sharing
app.use(cors())

app.use(express.json());

const userRoute = require('./routes/user.route'); //Routes
app.use("/user",userRoute);

const taskRoute = require('./routes/task.route');
app.use('/task',taskRoute)


app.listen(PORT, ()=> {
    console.log(`Server is Running on http://localhost:${PORT}`);
});