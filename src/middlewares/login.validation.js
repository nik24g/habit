const Joi = require('joi');
const { successResponse, errorResponse } = require("../utils/response");

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required()
});

const validation = async (req, res, next) => {
	const { error } = loginSchema.validate(req.body);
	if (error) {
		return res.status(406).json(errorResponse(406, error.details[0].message, {}));
	} else {
		next();
	}
};
module.exports = validation;