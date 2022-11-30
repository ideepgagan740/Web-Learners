// const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const authenticate = require("../middleware/authenticate")
// dotenv.config({path:'./config.env'});

require("../db/conn")
const User = require("../models/userSchema");

const cookieParser = require('cookie-parser')
router.use(cookieParser())
//Middleware
// const middleware = (req, res, next) => {
//     console.log("Inside Middleware")
//     next()
// }

router.get("/", (req, res) => {
    res.send("Hello World");
});

router.get("/about", authenticate, (req, res) => {
    console.log("Hello My About")
    res.send(req.rootUser);
})

router.get("/contact", authenticate, (req, res) => {
    res.send("Contact Page")
})

//Logout us ka Page
router.get("/logout", (req, res) => {
    console.log("Hello My Logout Page")
    res.clearCookie('jwtoken', { path: '/' })
    res.status(200).send("User Logout ")
})
router.get("/signin", (req, res) => {
    res.send("Signin Page")
})

router.get("/signup", (req, res) => {
    res.send("Signup Page")
})
//get user data for contact us and home page
router.get("/getdata", authenticate, (req, res) => {
    console.log("Hello we are getting Data")
    res.send(req.rootUser);
})

router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Please fill the required field" });
    }
    // using Async await
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ Error: "Email Already Exists" });
        }
        else if (password != cpassword) {
            return res.status(422).json({ error: "Password are not matching" })
        }
        else {
            const user = new User({ name, email, phone, work, password, cpassword })
            await user.save();
            res.status(201).json({ message: "User Register Successfully" })
        }


    } catch (err) {
        console.log(err)
    }
});

//Login route
router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ error: "Please Filled the Data" })
        }
        const userLogin = await User.findOne({ email: email });
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password)
            const token = await userLogin.generateAuthToken();
            console.log("Token :" + token)
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            })
            if (!isMatch) {
                res.status(400).json({ error: "Invalid Credentials pass" })
            }
            else {
                res.json({ message: "User Login Successfully" })

            }
        }
        else {
            res.status(400).json({ error: "Invalid Credentials" })
        }

    } catch (error) {
        console.log(error)

    }
})
router.post("/contact", authenticate, async (req, res) => {
    // console.log("Hello My About")
    // res.send(req.rootUser);
    try {
        const { name, email, phone, message } = req.body
        console.log(name, email, phone, message)
        if (!name || !email || !phone || !message) {
            console.log("error in contact form")
            return res.json({ error: "Please filled the contact us form" })
        }
        const userContact = await User.findOne({ _id: req.userID });
        if (userContact) {
            const userMessage = await userContact.addMessage(name, email, phone, message);
            console.log("userMessage" + userMessage)
            await userContact.save();
            res.status(201).json({ Message: "User Contact Successfully" })
        }
    } catch (error) {
        console.log(error)
    }

})


module.exports = router;