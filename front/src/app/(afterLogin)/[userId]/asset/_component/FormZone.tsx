"use client";
// react, next
import { useState, ChangeEventHandler, FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as styles from "./formZone.css";

type Props = { userId: string };

export default function FormZone({ userId }: Props) {
	const [name, setName] = useState("");
	const [amount, setAmount] = useState(0);
	const [memo, setMemo] = useState("");
	const queryClient = useQueryClient();
	const createAsset = useMutation({
		mutationFn: async (event: FormEvent) => {
			event.preventDefault();
			const ownerId = encodeURIComponent(userId);

			if (!name) return;

			return fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/asset/create`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json; charset=UTF-8",
				},
				body: JSON.stringify({ name, amount, memo, userId: ownerId }),
			});
		},
		onSuccess(_data, _variables, _context) {
			queryClient.invalidateQueries({ queryKey: ["users", userId, "assets"] });
			setName("");
			setAmount(0);
			setMemo("");
		},
		onError(error, _variables, _context) {
			console.log("error!!", error);
			setName("");
			setAmount(0);
			setMemo("");
		},
	});
	// [S] Event Handling
	const onChangeName: ChangeEventHandler<HTMLInputElement> = (event) => setName(event.target.value);
	const onChangeAmount: ChangeEventHandler<HTMLInputElement> = (event) => {
		const amount = +event.target.value.split(",").join("");
		setAmount(Number.isNaN(amount) ? 0 : amount);
	};
	const onChangeMemo: ChangeEventHandler<HTMLInputElement> = (event) => setMemo(event.target.value);
	// [E] Event Handling

	return (
		<form className={styles.form} onSubmit={createAsset.mutate}>
			<div className={styles.formInputWrapper}>
				<label className={styles.formInputLabel} htmlFor="name">
					자산명
				</label>
				<input id="name" className={styles.coloredInput} type="text" placeholder="자산명" value={name} onChange={onChangeName} />
			</div>
			<div className={styles.formInputWrapper}>
				<label className={styles.formInputLabel} htmlFor="amount">
					금액
				</label>
				<input id="amount" type="text" maxLength={20} value={amount.toLocaleString()} onChange={onChangeAmount} />
			</div>
			<div className={styles.grownFormInputWrapper}>
				<label className={styles.formInputLabel} htmlFor="memo">
					메모
				</label>
				<input id="memo" className={styles.grownFormInput} type="text" placeholder="메모" value={memo} onChange={onChangeMemo} />
			</div>

			<button className={styles.formButton} type="submit">
				CREATE!!!
			</button>
		</form>
	);
}
