const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.post("/", async (req, res) => {
    const data = req.body;

    const isEmailExists = await User.findOne({ email: data.email }); //to check whether the email already exists in database
    if (isEmailExists) {
        return res.send("Email already exists");
    }

    //salt generates random string and password cannot be stored directly so salt and password is hashed it is in encrypted string
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    try {
        const createdUser = new User({
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: hashedPassword,
        });
        await createdUser.save();
        res.send("User Created")
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

//creating an end point for login creds
router.post("/login", async (req, res) => {
    const data = req.body;
    const userData = await User.findOne({ email: data.email });
    if (!userData) {
        return res.send({
            message: "User not Registered",
            data: [],
            status: "error"
        });
    }

    const validatePassword = await bcrypt.compare(data.password, userData.password)
    if (!validatePassword) {
        return res.send({
            message: "Invalid Email or Password",
            data: [],
            status: "error"
        });
    }

    //login successfull
    res.send({
        message: "Login Successful",
        data: userData,
        status: "success"
    })
});
module.exports = router;