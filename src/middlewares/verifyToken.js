const jwt = require("jsonwebtoken");
const messages = require("../utils/constant");
const { errorResponse } = require("../utils/response");
const TokenModel = require("../models/token.model")

const verifytoken = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json(errorResponse(401, messages.error.NO_JWT));
    const token = authHeader.split(" ")[1];
    try {
        // checking token in db 
        const dbToken = await TokenModel.findOne({token: token})
        if(!dbToken) return errorResponse(404, messages.error.INVALID_JWT)
        jwt.verify(token, process.env.USER_ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) return res.send(errorResponse(401, messages.error.INVALID_JWT));
            req.id = payload.id,
            req.firstName = payload.firstName,
            req.lastName = payload.lastName
            req.email = payload.email;
            next();
        });
    } catch (error) {
        return res.status(400).json(errorResponse(400, messages.error.WRONG_WITH_JWT));
    }
};

module.exports = verifytoken;