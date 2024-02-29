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

// get a specific asset
router.get("/:userId/asset/:id", async (req, res) => {
	try {
		const asset = await Asset.findById(req.params.id);
		// console.log("here is the asset!", asset);
		return res.status(200).json(asset);
	} catch (error) {
		console.log("there's an error!!!", error);
		return res.status(500).json({ message: `failed to get all assets! ${error}` });
	}
});

// get all assets
router.get("/:userId", async (req, res) => {
	try {
		// 해당 유저의 asset만 불러오도록 수정!
		const userId = req.params.userId;
		// 세션에서 사용자 식별 후 검색에 포함해야 하는데... 백엔드 로직을 잘 모르겠으므로 일단 email로 구분해서 보내기
		const user_Id = await findUser(userId);
		// console.log("userId:::::", userId, user_Id);
		const assets = await Asset.find({ ownerId: user_Id }).populate("inputs");

		const formattedAssets = assets.map((asset) => {
			const amount = asset.inputs.reduce((totalAmount, currentInput) => {
				return currentInput.transactionType === "spending" ? totalAmount - currentInput.amount : currentInput.transactionType === "income" ? totalAmount + currentInput.amount : totalAmount;
			}, 0);
			return { ...asset.toObject(), inputDate: moment(asset.inputDate).format("YYYY-MM-DD"), amount };
		});

		// console.log("here are formatted assets!", formattedAssets);
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
	const { name, amount, memo, userId } = req.body;
	// console.log("name:", name, "amount:", amount, "memo:", memo, "userId:", userId, "decoded:", decodeURIComponent(userId));
	const ownerId = await findUser(decodeURIComponent(userId));
	try {
		const transactionType = amount >= 0 ? "income" : "spending";
		const newDaily = new Daily({ amount: Math.abs(amount), transactionType, memo: "자산입력", ownerId, isFirstInput: true });
		const newAsset = new Asset({ name, memo, ownerId, inputs: [newDaily._id] }); // new User object
		await Promise.all([newDaily.save(), newAsset.save()]);
		await newDaily.updateOne({ assetTypeId: newAsset._id });
		return res.status(200).json({ newAsset, message: "a asset record is input!" });
	} catch (error) {
		console.log("there's an error!!! when you tried to make a new asset", error);
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

		console.log("this will be updated!", id, req.body);

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
		const { senderId, senderAmount, recipientId, recipientAmount, amount, memo, userId } = req.body;
		console.log("body", req.body);
		const ownerId = await findUser(userId);

		// ownerId const user_Id = await findUser(userId); 이슈!!!!!!!
		// Asset에서 자산 이동
		// await Promise.all([Asset.findByIdAndUpdate(senderId, { amount: senderAmount - amount }), Asset.findByIdAndUpdate(recipientId, { amount: recipientAmount + amount })]);

		// Daily에 이체로 등록
		// 트랜잭션은 백엔드에서 처리되어야 하는가? => Yes(데이터 통합, 트래픽 감소, 보안, 확장성 측면에서 유리함)
		const senderDaily = new Daily({ ownerId, transactionType: "spending", amount, assetTypeId: senderId, memo });
		const recipientDaily = new Daily({ ownerId, transactionType: "income", amount, assetTypeId: recipientId, memo });

		await Promise.all([Asset.findByIdAndUpdate(senderId, { $push: { inputs: senderDaily._id } }), Asset.findByIdAndUpdate(recipientId, { $push: { inputs: recipientDaily._id } }), senderDaily.save(), recipientDaily.save()]);

		return res.status(200).json({ message: "transfered!!!" });
	} catch (error) {
		console.log("there's an error!!!", error);
		return res.status(500).json({ message: `failed to transfer! ${error}` });
	}
});

// remove an asset
router.delete("/delete", async (req, res) => {
	try {
		const { assetTypeId } = req.body;
		console.log("assetTypeId", assetTypeId);

		// const { _id, assetTypeId } = req.body;
		// await Daily.findByIdAndDelete(_id);

		// console.log(`asset type id: ${assetTypeId}, daily id: ${_id}`);
		await Daily.deleteMany({ assetTypeId });
		await Asset.findByIdAndDelete(assetTypeId);

		return res.status(200).json({ message: "deleted!!!" });
	} catch (error) {
		console.log("failed to remove!", error);
		return res.status(500).json({ message: `failed to remove! ${error}` });
	}
});
/** [E] APIs */

module.exports = router;
