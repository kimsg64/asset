"use client";

import React, { ChangeEventHandler, FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

import { useModalStore } from "@/store/modal";
import { IAsset } from "@/interfaces/IAsset";
import * as styles from "./itemBoxes.css";

type Props = { asset: IAsset; userId: string; isTransferable: boolean };

export default function ItemBox({ asset, userId, isTransferable }: Props) {
	const [isUpdating, setIsUpdating] = useState(false);
	const [name, setName] = useState("");
	const [memo, setMemo] = useState("");
	const router = useRouter();
	const searchParams = useSearchParams();
	const modalStore = useModalStore();

	const queryClient = useQueryClient();
	const updateAsset = useMutation({
		mutationFn: async (event: FormEvent) => {
			event.preventDefault();
			return fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/asset/update/${asset._id}`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json; charset=UTF-8",
				},
				body: JSON.stringify({ name, memo }),
			});
		},
		onSuccess(_data, _variables, _context) {
			queryClient.invalidateQueries({ queryKey: ["users", userId, "assets"] });
			setName("");
			setMemo("");
			onClickCancel();
		},
		onError(error, _variables, _context) {
			console.log("error!!", error);
			setName("");
			setMemo("");
		},
	});

	const onClickTransfer = () => {
		const newSearchParams = new URLSearchParams(searchParams);
		newSearchParams.set("type", "transfer");
		modalStore.setIsOverflowHidden(true);
		router.push(`/${userId}/asset/i/${asset._id}?${newSearchParams.toString()}`, { scroll: false });
	};
	const onClickDelete = () => {
		const newSearchParams = new URLSearchParams(searchParams);
		newSearchParams.set("type", "delete");
		newSearchParams.set("name", asset.name);
		modalStore.setIsOverflowHidden(true);
		router.push(`/${userId}/asset/i/${asset._id}?${newSearchParams.toString()}`, { scroll: false });
	};
	const onClickNavigate = () => {
		const newSearchParams = new URLSearchParams(searchParams);
		newSearchParams.set("asset", asset._id);
		router.push(`/${userId}/daily?${newSearchParams.toString()}`);
	};
	const onClickUpdate = () => setIsUpdating(true);
	const onChangeName: ChangeEventHandler<HTMLInputElement> = (event) => setName(event.target.value);
	const onChangeMemo: ChangeEventHandler<HTMLInputElement> = (event) => setMemo(event.target.value);
	const onClickCancel = () => (setIsUpdating(false), setName(""), setMemo(""));

	// console.log("session data in item box", userId);

	return (
		<form className={styles.itemBox} key={asset._id} onSubmit={updateAsset.mutate}>
			<div className={styles.infoZone}>
				{isUpdating ? <input id="name" className={styles.itemBoxInput} placeholder={asset.name} type="text" value={name} onChange={onChangeName} /> : <div className={styles.assetName}>{asset.name}</div>}
				<div className={asset.amount >= 0 ? styles.amount : styles.amountMinus}>{asset.amount!.toLocaleString()}</div>
				{isUpdating ? <input id="memo" className={styles.itemBoxInput} placeholder={asset.memo} type="text" value={memo} onChange={onChangeMemo} /> : <div className={styles.description}>{asset.memo}</div>}
				{!isUpdating && (
					<div className={styles.closeButton} onClick={onClickDelete}>
						<svg viewBox="0 0 24 24" aria-hidden="true" className={styles.closeButtonInner}>
							<g>
								<path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
							</g>
						</svg>
					</div>
				)}
			</div>
			<div className={styles.buttonsZone}>
				{isUpdating ? (
					<>
						<button className={styles.button} type="submit">
							수정 완료
						</button>
						<button className={styles.button} type="button" onClick={onClickCancel}>
							수정 취소
						</button>
					</>
				) : (
					<>
						{isTransferable && (
							<button className={styles.button} type="button" onClick={onClickTransfer}>
								이체
							</button>
						)}
						{/* <Link className={styles.button} href={{ pathname: `/${userId}/daily`, query: { asset: asset._id } }}>
                            <button type="button">상세</button>
                        </Link> */}
						<button className={styles.button} type="button" onClick={onClickNavigate}>
							상세
						</button>
						<button className={styles.button} type="button" onClick={onClickUpdate}>
							수정
						</button>
					</>
				)}
			</div>
		</form>
	);
}
