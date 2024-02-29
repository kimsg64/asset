const express = require("express");
const router = express.Router();
// libs
const moment = require("moment");

const { Asset } = require("../../models/asset");
const { Daily } = require("../../models/daily");
const { User } = require("../../models/user");

const findUser = async (email) => {
	console.log("this is user", email);
	const id = email.includes("@") ? email : email.replace("%40", "@");
	const user = await User.findOne({ id });
	if (user) {
		console.log("this is user", user._id);
		return user._id;
	}
	return null;
};
/** [S] APIs */

// create a stock
router.post("/create", async (req, res) => {
	const { ticker, market, shares, userId } = req.body;
	const ownerId = await findUser(userId);
	// 티커, 거래소, inputs(매입 수, 매입 금액, 매입 당시 환율, 매입 당시 가격)
	try {
		return res.status(200).json({ newStock, message: "a asset record is input!" });
	} catch (error) {
		return res.status(500).json({ message: `failed to create a stock account! ${error}` });
	}
});
