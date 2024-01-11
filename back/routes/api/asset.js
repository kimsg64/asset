const express = require("express");
const router = express.Router();
// libs
const moment = require("moment");

const { Asset } = require("../../models/asset");
const { Daily } = require("../../models/daily");

/** [S] APIs */

// get a specific asset
router.get("/:id", async (req, res) => {
    try {
        const asset = await Asset.findById(req.params.id);
        console.log("here is the asset!", asset);
        return res.status(200).json({ asset, message: "here is the asset!!" });
    } catch (error) {
        console.log("there's an error!!!", error);
        return res.status(500).json({ message: `failed to get all assets! ${error}` });
    }
});

// get all assets
router.get("/", async (req, res) => {
    try {
        const assets = await Asset.find({}).populate("inputs");

        const formattedAssets = assets.map((asset) => {
            const amount = asset.inputs.reduce((totalAmount, currentInput) => {
                return currentInput.transactionType === "spending" ? totalAmount - currentInput.amount : currentInput.transactionType === "income" ? totalAmount + currentInput.amount : totalAmount;
            }, 0);
            return { ...asset.toObject(), inputDate: moment(asset.inputDate).format("YYYY-MM-DD"), amount };
        });

        console.log("here are formatted assets!", formattedAssets);
        return res.status(200).json(formattedAssets);
    } catch (error) {
        console.log("there's an error!!!", error);
        return res.status(500).json({ message: `failed to get all assets! ${error}` });
    }
});

// create an asset
router.post("/create", async (req, res) => {
    // console.log("posted!!!", req.body);
    // console.log("this is new asset input!", newAsset);
    const { name, amount, memo } = req.body;
    try {
        const newDaily = new Daily({ amount, transactionType: "income", memo: "자산입력", owner: "you" });
        const newAsset = new Asset({ name, memo, owner: "you", inputs: [newDaily._id] }); // new User object
        await Promise.all([newDaily.save(), newAsset.save()]);
        await newDaily.updateOne({ assetTypeId: newAsset._id });
        return res.status(200).json({ newAsset, message: "a asset record is input!" });
    } catch (error) {
        console.log("there's an error!!!", error);
        if (error.code === 11000) {
            return res.status(500).json({ message: `failed to create a asset record! ${error}` });
        }
    }
});

// update an asset
router.post("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updated = req.body;
        if (!updated.name) delete updated.name;
        if (!updated.memo) delete updated.memo;

        console.log("this will be updated!", id, updated);

        await Asset.findByIdAndUpdate(id, updated);
        // const { amount, transactionType } = req.body;
        // const targetAsset = await Asset.findById(id);
        // const newAmount = transactionType === "spending" ? targetAsset.amount - amount : transactionType === "income" ? targetAsset.amount + amount : targetAsset.amount;
        // console.log(`id: ${id}, added: ${amount}, transaction: ${transactionType}, result: ${newAmount}`);
        // await Asset.findByIdAndUpdate(id, { amount: newAmount });
        return res.status(200).json({ message: "asset updated!" });
    } catch (error) {
        console.log("there's an error!!!", error);
        return res.status(500).json({ message: `failed to update the asset! ${error}` });
    }
});

// transfer from an asset(sender) to another(recipient)
// @transaction: update two assets and update two daily inputs
router.post("/transfer", async (req, res) => {
    try {
        const { senderId, senderAmount, recipientId, recipientAmount, amount, memo } = req.body;

        // Asset에서 자산 이동
        // await Promise.all([Asset.findByIdAndUpdate(senderId, { amount: senderAmount - amount }), Asset.findByIdAndUpdate(recipientId, { amount: recipientAmount + amount })]);

        // Daily에 이체로 등록
        // 트랜잭션은 백엔드에서 처리되어야 하는가? => Yes(데이터 통합, 트래픽 감소, 보안, 확장성 측면에서 유리함)
        const senderDaily = new Daily({ owner: "you", transactionType: "spending", amount, assetTypeId: senderId, memo });
        const recipientDaily = new Daily({ owner: "you", transactionType: "income", amount, assetTypeId: recipientId, memo });
        await Promise.all([
            Asset.findByIdAndUpdate(senderId, { $push: { inputs: senderDaily._id } }),
            Asset.findByIdAndUpdate(recipientId, { $push: { inputs: recipientDaily._id } }),
            senderDaily.save(),
            recipientDaily.save(),
        ]);

        return res.status(200).json({ message: "transfered!!!" });
    } catch (error) {
        console.log("there's an error!!!", error);
        return res.status(500).json({ message: `failed to transfer! ${error}` });
    }
});
/** [E] APIs */

module.exports = router;
