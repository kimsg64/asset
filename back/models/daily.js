const mongoose = require("mongoose");
const moment = require("moment"); // get and format time

const DailySchema = new mongoose.Schema({
	ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	amount: { type: Number, required: true },
	assetTypeId: { type: mongoose.Schema.Types.ObjectId, ref: "Asset" },
	transactionType: { type: String, enum: ["spending", "income", "transfer"], required: true },
	registeredDate: { type: Date, default: moment().format("YYYY-MM-DD HH:mm") },
	isFirstInput: { type: Boolean, default: false },
	memo: { type: String, default: "" },
});

const Daily = mongoose.model("Daily", DailySchema);
module.exports = { Daily };
