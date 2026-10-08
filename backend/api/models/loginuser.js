const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const loginuserSchema = new mongoose.Schema({
	name: { type: String, required: true, trim: true },
	email: { type: String, required: true, unique: true, lowercase: true, trim: true },
	password: { type: String, required: true },
}, { timestamps: true });

loginuserSchema.methods.generateAuthToken = function () {
	const secret = process.env.JWT_PRIVATE_KEY;
	if (!secret) {
		throw new Error("JWT_PRIVATE_KEY is not configured");
	}

	const token = jwt.sign({ _id: this._id }, secret, {
		expiresIn: "1d",
	});
	return token;
};

const loginUser = mongoose.model("loginuser", loginuserSchema);

const validate = (data) => {
	const schema = Joi.object({
		name: Joi.string().trim().min(1).max(100).required().label("Name"),
		email: Joi.string().trim().lowercase().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data, { abortEarly: true, stripUnknown: true });
};

module.exports = { loginUser, validate };