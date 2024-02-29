const express = require("express");
const router = express.Router();

const multer = require("multer"); // upload image to Mongoose

const { User } = require("../../models/user");

/** [S] APIs */
// create a user
// const storage = multer.memoryStorage();
// const upload = multer({ storage });
// router.post("/", upload.single("avatar"), async (req, res) => {
// 	console.log("posted!!!", req.body);
// 	const avatar = req.file;
// 	console.log("posted avatar!!!", avatar);
// 	const newUser = new User({ ...req.body, avatar: { data: avatar.buffer, contentType: avatar.mimetype } }); // new User object
// 	// console.log("this is new user!", newUser);
// 	try {
// 		await newUser.save();
// 		return res.status(200).json({ newUser, message: "a user is created!" });
// 	} catch (error) {
// 		console.log("there's an error!!!", error);
// 		if (error.code === 11000) {
// 			return res.status(500).json({ message: `failed to create a user! ${error}` });
// 		}
// 	}
// });
router.post("/", async (req, res) => {
	console.log("posted!!!", req.body);
	const newUser = new User({ ...req.body }); // new User object
	// console.log("this is new user!", newUser);
	try {
		await newUser.save();
		return res.status(200).json({ newUser, message: "a user is created!" });
	} catch (error) {
		console.log("there's an error!!!", error);
		if (error.code === 11000) {
			return res.status(500).json({ message: `failed to create a user! ${error}` });
		}
	}
});

// login
router.post("/login", async (req, res) => {
	const { id, password } = req.body;
	console.log("id", id, "password", password);
	try {
		const user = await User.findOne({ id, password });
		console.log("is this yours?", user);
		if (!!user) {
			return res.status(200).json(user);
		} else {
			return res.status(500).json({ message: "not_exist" });
		}
	} catch (error) {
		console.log("there's an error!!!", error);
	}
});

// logout
router.post("/logout", async (req, res) => {
	res.clearCookie();
	return res.status(200).json({ message: "logout!" });
});

// logout
router.put("/update", async (req, res) => {
	console.log("req!!!", req.body);
	const { email, name, password } = req.body;
	console.log("email", email, "name", name, "password", password);
	const id = email.includes("@") ? email : email.replace("%40", "@");
	try {
		const newUser = await User.findOneAndUpdate({ id }, { name, password }, { new: true });
		console.log("newUser", newUser);
		await newUser.save();
		return res.status(200).json({ message: "update profile!" });
	} catch (error) {
		console.log("failed to update...", error);
		return res.status(500).json({ message: "failed to update..." });
	}
});

// (임시) get avatar
router.get("/avatar/:userId", async (req, res) => {
	const email = req.params.userId;
	console.log("this is user", req.params);
	console.log("this is user", email);
	try {
		const id = email.includes("@") ? email : email.replace("%40", "@");
		const user = await User.findOne({ id });
		console.log("getting avatar", user.avatar);
		if (!!user) {
			return res.status(200).json({ avatar: user.avatar });
		} else {
			return res.status(500).json({ message: "not_exist" });
		}
	} catch (error) {
		console.log("there's an error!!!", error);
	}
});

/** [E] APIs */

module.exports = router;
