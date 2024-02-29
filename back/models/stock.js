const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
	ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	name: { type: String, required: true },
	inputs: [{ type: mongoose.Schema.Types.ObjectId, ref: "DailyStock" }],
	memo: { type: String, default: "" },
});

const Stock = mongoose.model("Stock", StockSchema);
module.exports = { Stock };
