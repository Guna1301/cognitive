const router = require("express").Router();
const { loginUser, validate } = require("../models/loginuser");
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const email = req.body.email.toLowerCase().trim();
		const user = await loginUser.findOne({ email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(10));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new loginUser({
			name: req.body.name.trim(),
			email,
			password: hashPassword,
		}).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		if (error.code === 11000) {
			return res.status(409).send({ message: "User with given email already Exist!" });
		}
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;