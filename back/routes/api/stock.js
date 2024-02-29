const express = require("express");
const router = express.Router();
// libs
const moment = require("moment");

const { Asset } = require("../../models/asset");
const { DailyStock } = require("../../models/dailystock");
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
	const { name, memo, userId } = req.body;
	// console.log("name:", name, "amount:", amount, "memo:", memo, "userId:", userId, "decoded:", decodeURIComponent(userId));
	const ownerId = await findUser(decodeURIComponent(userId));
	try {
		const newDailyStock = new DailyStock({
			ownerId,
			registeredDate,
			transactionType: "buy",
			transferredFrom,
			shares,
			priceAtPurchase,
			exchangeRateAtPurchase,
			ticker,
			market,
		});
		const newStock = new Stock({ name, memo, ownerId, inputs: [newDailyStock._id] }); // new User object
		await Promise.all([newDailyStock.save(), newStock.save()]);
		await newDailyStock.updateOne({ stockId: newStock._id });
		return res.status(200).json({ newStock, message: "a stock record is input!" });
	} catch (error) {
		console.log("there's an error!!! when you tried to make a new asset", error);
		if (error.code === 11000) {
			return res.status(500).json({ message: `failed to create a asset record! ${error}` });
		}
	}
});
