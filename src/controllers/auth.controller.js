const UserModel = require("../models/user.model")
const TokenModel = require("../models/token.model")
const { successResponse, errorResponse } = require("../utils/response")
const messages = require("../utils/constant")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const register = async (req) => {
    const email = req.body.email
    const password1 = req.body.password1
    // checking is user already exists or not 
    const user = await UserModel.findOne({ user_email: email })
    if (user) return errorResponse(409, messages.error.USER_ALREADY, {})
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password1, saltRounds)
    const newUser = new UserModel({
        user_email: email,
        user_password: hashedPassword
    })
    await newUser.save()
    return successResponse(201, messages.success.USER_CREATED, {})
}

const login = async (req) => {
    let enteredEmail = req.body.email;
    let enteredPassword = req.body.password;
    let user = await UserModel.findOne({ user_email: enteredEmail });

    let token;
    if (!user) return errorResponse(404, messages.error.USER_NOT_FOUND, {});
    else {
        // now check password is correct or wrong
        const match = await bcrypt.compare(enteredPassword, user.user_password);
        if (match) {
            let payload = {
                id: user.user_id,
                firstName: user.user_first_name,
                lastName: user.user_last_name,
                email: user.user_email
            };
            token = jwt.sign(payload, process.env.USER_ACCESS_TOKEN_SECRET, {
                expiresIn: "7d",
            });
            // deleting existing token if any in db and storing new one 
            await TokenModel.findOneAndDelete({token_user_id: user.user_id})
            const newDbToken = new TokenModel({
                token_user_id: user.user_id,
                token: token
            })
            await newDbToken.save()
            return successResponse(200, messages.success.USER_LOGIN, {
                token: token,
            });
        } else {
            return errorResponse(401, messages.error.WRONG_PASSWORD, {});
        }
    }
};

const logout = async (req) => {
    const id = req.id
    // checking token in db 
    const token = await TokenModel.findOneAndDelete({token_user_id: id})
    return successResponse(200, messages.success.LOGOUT_SUCCESS)
}
module.exports = { register, login, logout }