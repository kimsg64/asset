"use client";
// react, next
import { ChangeEventHandler, FormEvent, FormEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TextareaAutosize from "react-textarea-autosize";

// custom modules
import { useModalStore } from "@/store/modal";
import { getAssets } from "@/app/(afterLogin)/[userId]/_lib/getAssets";
import { IAsset } from "@/interfaces/IAsset";
import * as styles from "./assetModal.css";
import Backdrop from "@/app/(afterLogin)/[userId]/_component/Backdrop";

type Props = { assetTypeId: string; userId: string };

export default function TransferModal({ assetTypeId, userId }: Props) {
	// const [assetList, setAssetList] = useState<IAsset[]>([]);
	const [sender, setSender] = useState<IAsset>();
	const [recipient, setRecipient] = useState<IAsset>();
	const [amount, setAmount] = useState(0);
	const [memo, setMemo] = useState("");

	const router = useRouter();
	const modalStore = useModalStore();

	const { data: assets } = useQuery<IAsset[], Object, IAsset[], [_1: string, string, _3: string]>({
		queryKey: ["users", userId, "assets"],
		queryFn: getAssets,
		staleTime: 60 * 1000,
		gcTime: 300 * 1000,
	});
	const queryClient = useQueryClient();

	const transferAsset = useMutation({
		mutationFn: async (event: FormEvent) => {
			event.preventDefault();
			return fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/asset/transfer`, {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json; charset=UTF-8" },
				body: JSON.stringify({
					senderId: sender?._id,
					senderAmount: sender?.amount,
					recipientId: recipient?._id,
					recipientAmount: recipient?.amount,
					amount,
					memo,
					userId,
				}),
			});
		},
		onSuccess: () => {
			console.log("done!");
			queryClient.invalidateQueries({ queryKey: ["users", userId, "assets"] });
			destroyModal();
		},
		onError: (error) => {
			console.log("error!!!!", error);
		},
	});

	// [S] useEffect
	useEffect(() => {
		setSender(assets?.find((asset) => asset._id === assetTypeId));
		setRecipient(assets?.filter((asset) => asset._id !== assetTypeId)[0]);
	}, [assets, assetTypeId]);
	// [E] useEffect

	// [S] event handling
	const onChangeAmount: ChangeEventHandler<HTMLInputElement> = (event) => {
		if (!sender) return;
		const amount = Math.abs(+event.target.value.split(",").join(""));
		setAmount(Number.isNaN(amount) ? 0 : amount > sender.amount ? sender.amount : amount);
	};
	const onChangeRecipient: FormEventHandler<HTMLSelectElement> = (event) => {
		const recipientId = event.currentTarget.value;
		setRecipient(assets?.find((asset) => asset._id === recipientId)!);
	};
	const onChangeMemo: ChangeEventHandler<HTMLTextAreaElement> = (event) => setMemo(event.target.value);

	const destroyModal = () => {
		modalStore.setIsOverflowHidden(false);
		router.back();
	};

	return (
		<Backdrop>
			<form className={styles.modalBody} onSubmit={transferAsset.mutate}>
				<div>
					<div>{`'${sender?.name}(${sender?.amount.toLocaleString()})'`}에서</div>
					<select className={styles.selectBox} value={recipient?._id} onChange={onChangeRecipient}>
						{assets
							?.filter((asset) => asset._id !== assetTypeId)
							.map((asset) => (
								<option key={asset._id} value={asset._id}>{`${asset.name}(${asset.amount!.toLocaleString()})`}</option>
							))}
					</select>
					<span>으로 </span>

					<input id="amount" type="text" placeholder="금액" maxLength={20} value={amount.toLocaleString()} onChange={onChangeAmount} />
					<span>원 이체</span>
					<TextareaAutosize className={styles.textarea} id="memo" placeholder="메모" value={memo} onChange={onChangeMemo} />
				</div>
				<div className={styles.buttonsZone}>
					<button className={styles.button}>이체</button>
					<button className={styles.button} type="button" onClick={destroyModal}>
						취소
					</button>
				</div>
			</form>
		</Backdrop>
	);
}
