const Joi = require('joi');
const { successResponse, errorResponse } = require("../utils/response");

const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password1: Joi.string()
        .min(5)
        .required(),
    password2: Joi.valid(Joi.ref('password1')).required(),
});

const validation = async (req, res, next) => {
	const { error } = userSchema.validate(req.body);
	if (error) {
		return res.status(406).json(errorResponse(406, error.details[0].message, {}));
	} else {
		next();
	}
};
module.exports = validation;