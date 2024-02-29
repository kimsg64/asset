const mongoose = require("mongoose");
const moment = require("moment"); // get and format time

const DailyStockSchema = new mongoose.Schema({
	ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	registeredDate: { type: Date, default: moment().format("YYYY-MM-DD HH:mm") },
	transactionType: { type: String, enum: ["buy", "sell"], required: true },
	transferredFrom: { type: mongoose.Schema.Types.ObjectId, ref: "Asset" },
	transferTo: { type: mongoose.Schema.Types.ObjectId, ref: "Asset" },
	shares: { type: Number, required: true },
	priceAtPurchase: { type: Number, required: true },
	exchangeRateAtPurchase: { type: Number, required: true },
	ticker: { type: String, required: true },
	market: { type: String, required: true },
	stockId: { type: mongoose.Schema.Types.ObjectId, ref: "Stock" },
	memo: { type: String, default: "" },
});

const DailyStock = mongoose.model("DailyStock", DailyStockSchema);
module.exports = { DailyStock };
