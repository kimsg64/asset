const mongoose = require("mongoose");
const moment = require("moment"); // get and format time

const DailySchema = new mongoose.Schema({
    owner: { type: String, required: true }, // 임시
    // ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    assetTypeId: { type: mongoose.Schema.Types.ObjectId, ref: "Asset" },
    transactionType: { type: String, enum: ["spending", "income", "transfer"], required: true },
    registeredDate: { type: Date, default: moment().format("YYYY-MM-DD") },
    memo: { type: String, default: "" },
});

const Daily = mongoose.model("Daily", DailySchema);
module.exports = { Daily };