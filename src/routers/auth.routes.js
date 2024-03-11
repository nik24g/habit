const express = require('express');
const router = express.Router();
const {register, login, logout} = require("../controllers/auth.controller")
const registerValidation = require("../middlewares/register.validation")
const loginValidation = require("../middlewares/login.validation")
// const passport = require('passport');

router.post("/register", registerValidation, async (req, res)=>{
    try {
        const response = await register(req)
        return res.status(response.code).json(response)
    } catch (error) {
        console.log(error);
        return res.status(500).json({})
    }
})

router.post("/login", loginValidation, async (req, res)=>{
    try {
        const response = await login(req)
        return res.status(response.code).json(response)
    } catch (error) {
        console.log(error);
        return res.status(500).json({})
    }
})

router.delete("/logout", async (req, res)=>{
    try {
        const response = await logout(req)
        return res.status(response.code).json(response)
    } catch (error) {
        console.log(error);
        return res.status(500).json({})
    }
})
// Authenticate with Google
// router.get('/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] })
// );
module.exports = router;