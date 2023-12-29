const mongoose = require("mongoose");
const moment = require("moment"); // get and format time
const Daily = require("./daily").Daily;

const AssetSchema = new mongoose.Schema(
    {
        owner: { type: String, required: true }, // 임시
        // ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        name: { type: String, required: true },
        inputs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Daily" }],
        memo: { type: String, default: "" },
    }
    // { toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

// AssetSchema.virtual("amount", {
//     ref: "Daily",
//     localField: "inputs",
//     foreignField: "_id",
//     justOne: false,
//     get: async function () {
//         try {
//             const populatedInputs = await Daily.find({ _id: { $in: this.inputs } });
//             console.log("populatedInputs", populatedInputs);
//             return populatedInputs.reduce((prevTotalAmount, currInputId) => prevTotalAmount + currInputId.amount, 0);
//         } catch (error) {
//             console.log(error);
//             return 0;
//         }
//     },
// });

const Asset = mongoose.model("Asset", AssetSchema);
module.exports = { Asset };
