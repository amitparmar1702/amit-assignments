const UserModel = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await UserModel.findOne({ email }); 

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists, please login",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10); 

        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: "Signup successful",
            success: true
        });

    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({
            message: "Something went wrong during signup",
            success: false
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await UserModel.findOne({ email }); 
        const errmasge = "Email and Password is wrong"
        if (!existingUser) {
            return res.status(404).json({
                message: errmasge,
                success: false
            });
        }

        const passWqual = await bcrypt.compare(password,existingUser.password) 
             if (!passWqual) {
            return res.status(404).json({
                message: errmasge,
                success: false
            });
        }

     const jwtToken =  jwt.sign(
        {email: existingUser.email, _id: existingUser._id },
        process.env.JWT_SECRET,
        {expiresIn : '24h'}
     )
  
        res.status(200).json({
            message: "login successful",
            success: true,
            jwtToken,
            email:existingUser.email,
            name: existingUser.name
        });

    } catch (err) {
        console.error("login error:", err);
        res.status(500).json({
            message: "Something went wrong during login",
            success: false
        });
    }
};

module.exports = {
    signup,
    login
};
