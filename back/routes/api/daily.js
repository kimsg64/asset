const express = require("express");
const router = express.Router();
const moment = require("moment");

const { Daily } = require("../../models/daily");
const { Asset } = require("../../models/asset");
const { User } = require("../../models/user");

const findUser = async (email) => {
    console.log("this is user@@@@@", email);
    const id = email.includes("@") ? email : email.replace("%40", "@");
    const user = await User.findOne({ id });
    if (user) {
        console.log("this is user", user._id);
        return user._id;
    }
    return null;
};

/** [S] APIs */
// get all daily records
router.get("/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const cursor = req.query.cursor;
        console.log("requsetparams!!!!!", userId);
        console.log("requsetquerystring!!!!!", cursor);
        const user_Id = await findUser(userId);
        const records = await Daily.find({ ownerId: user_Id }).sort({ registeredDate: -1 });
        // 몽구스 내부에서 쓰기 위해 find의 결과 값은 좀 다르게 생겼다. 따라서 toObject()를 통해 모델과 같은 모양의 객체를 가져와야 함
        const formattedRecords = records.map((record) => ({ ...record.toObject(), registeredDate: moment(record.registeredDate).format("YYYY-MM-DD") }));
        console.log("here are records!", records);
        return res.status(200).json(formattedRecords);
    } catch (error) {
        console.log("there's an error!!!", error);
        return res.status(500).json({ message: `failed to get all daily records! ${error}` });
    }
});
// get filtered daily records
router.post("/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const user_Id = await findUser(userId);
        const cursor = req.query.cursor;
        const { filteredTransactionType, filteredAssetTypeId, from, to, keyword } = req.body;
        const queries = [];
        if (!!filteredTransactionType) queries.push({ transactionType: { $eq: filteredTransactionType } });
        if (!!filteredAssetTypeId) queries.push({ assetTypeId: { $eq: filteredAssetTypeId } });
        if (!!from) queries.push({ registeredDate: { $gte: from } });
        if (!!to) queries.push({ registeredDate: { $lte: to } });
        if (!!keyword) queries.push({ memo: { $regex: keyword } });

        const conditions = queries.length === 0 ? { ownerId: user_Id } : { ownerId: user_Id, $and: queries };
        const records = await Daily.find(conditions).sort({ registeredDate: -1 });
        const formattedRecords = records.map((record) => ({ ...record.toObject(), registeredDate: moment(record.registeredDate).format("YYYY-MM-DD") }));
        console.log("here are filtered records!", records);
        return res.status(200).json({ records: formattedRecords, message: "here are all records!" });
    } catch (error) {
        console.log("there's an error!!!", error);
        return res.status(500).json({ message: `failed to get filtered daily records! ${error}` });
    }
});

// create a daily input record
// @transaction: create a daily input record and update the asset
router.post("/create", async (req, res) => {
    // 1. create a daily input
    const ownerId = req.body.ownerId.includes("@") ? req.body.ownerId : req.body.ownerId.replace("%40", "@");
    const newDaily = new Daily({ ...req.body, ownerId }); // new User object

    const assetTypeId = req.body.assetTypeId;
    // 2. update the asset
    try {
        await Promise.all([Asset.findByIdAndUpdate(assetTypeId, { $push: { inputs: newDaily._id } }), newDaily.save()]);
        return res.status(200).json({ newDaily, message: "a daily record is input!" });
    } catch (error) {
        console.log("there's an error!!!", error);
        if (error.code === 11000) {
            return res.status(500).json({ message: `failed to create a daily record! ${error}` });
        }
    }
});

// delete a daily record
router.post("/delete", async (req, res) => {
    console.log(req.body);
    try {
        const { _id, assetTypeId } = req.body;
        // await Daily.findByIdAndDelete(_id);

        // console.log(`asset type id: ${assetTypeId}, daily id: ${_id}`);
        await Asset.findByIdAndUpdate(assetTypeId, { $pull: { inputs: _id } });
        await Daily.findByIdAndDelete(_id);

        return res.status(200).json({ message: "deleted!!!" });
    } catch (error) {
        console.log("there's an error!!!", error);
        return res.status(500).json({ message: `failed to delete a daily record! ${error}` });
    }
});
/** [E] APIs */

module.exports = router;
