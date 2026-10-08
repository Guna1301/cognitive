const router = require("express").Router();
const { loginUser } = require("../models/loginuser");
const bcryptjs = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const jwtSecret = process.env.JWT_PRIVATE_KEY;
const client = googleClientId ? new OAuth2Client(googleClientId) : null;

const setTokenCookie = (res, token) => {
	res.cookie("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
		maxAge: 24 * 60 * 60 * 1000,
	});
};

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await loginUser.findOne({ email: req.body.email.toLowerCase().trim() });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcryptjs.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const token = user.generateAuthToken();
        setTokenCookie(res, token);
		res.status(200).send({ message: "Logged in successfully", user: { name: user.name, email: user.email } });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.post("/google", async (req, res) => {
    try {
        if (!client || !req.body.credential) {
            return res.status(400).send({ message: "Google authentication is not configured" });
        }

        const { credential } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: googleClientId,
        });
        const payload = ticket.getPayload();
        if (!payload || !payload.email || payload.email_verified !== true) {
            return res.status(401).send({ message: "Google account could not be verified" });
        }

        let user = await loginUser.findOne({ email: payload.email.toLowerCase() });
        if (!user) {
            user = new loginUser({
                name: payload.name,
                email: payload.email.toLowerCase(),
                password: await bcryptjs.hash(`${payload.sub}:${jwtSecret}`, 10),
            });
            await user.save();
        }

        const token = user.generateAuthToken();
        setTokenCookie(res, token);
        res.status(200).send({ message: "Logged in with Google successfully", user: { name: user.name, email: user.email } });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).send({ message: "An account already exists for this Google email" });
        }
        res.status(401).send({ message: "Google authentication failed" });
    }
});

router.get("/me", async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).send({ message: "Not authenticated" });

    try {
        if (!jwtSecret) {
            return res.status(500).send({ message: "Authentication is not configured" });
        }
        const decoded = jwt.verify(token, jwtSecret);
        const user = await loginUser.findById(decoded._id).select('-password');
        if (!user) return res.status(404).send({ message: "User not found" });

        res.status(200).send({ user });
    } catch (ex) {
        res.status(401).send({ message: "Invalid token" });
    }
});

router.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    res.status(200).send({ message: "Logged out successfully" });
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;