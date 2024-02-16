"use client";
// react, next
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

// custom modules
import { IAsset } from "@/interfaces/IAsset";
import { TransactionType } from "@/interfaces/IDaily";
import { getAssets } from "../../_lib/getAssets";
import { useTotalAssetStore } from "@/store/totalAsset";
import * as styles from "./formZone.css";

type Props = { userId: string };

export default function FormZone({ userId }: Props) {
	const [transactionType, setTransactionType] = useState("spending");
	const [assetTypeId, setAssetTypeId] = useState("");
	const [registeredDate, setRegisteredDate] = useState(dayjs(new Date()).format("YYYY-MM-DD"));
	const [registeredHour, setRegisteredHour] = useState("00");
	const [registeredMinute, setRegisteredMinute] = useState("00");
	const [amount, setAmount] = useState(0);
	const [memo, setMemo] = useState("");
	const [message, setMessage] = useState("");
	const router = useRouter();
	const { data: assets } = useQuery<IAsset[], Object, IAsset[], [_1: string, string, _3: string]>({
		queryKey: ["users", userId, "assets"],
		queryFn: getAssets,
		staleTime: 60 * 1000,
		gcTime: 300 * 1000,
	});
	const queryClient = useQueryClient();
	const totalAssetStore = useTotalAssetStore();

	if (assets?.length === 0) {
		alert("you should have at least ONE asset!");
		router.push(`/${userId}/asset`);
	}

	useEffect(() => {
		totalAssetStore.setTotalAsset(
			assets?.reduce((accumulator, currentAsset) => {
				return accumulator + currentAsset.amount;
			}, 0) as number
		);
	}, [totalAssetStore.setTotalAsset, assets]);

	const createInput = useMutation({
		mutationFn: async () => {
			const fullRegisteredDate = new Date(`${registeredDate} ${registeredHour}:${registeredMinute}`);
			const newDailyInputReq = {
				transactionType: transactionType as TransactionType,
				amount,
				assetTypeId,
				registeredDate: fullRegisteredDate,
				memo,
				ownerId: userId,
			};
			return fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/daily/create`, {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json; charset=UTF-8" },
				body: JSON.stringify(newDailyInputReq),
			});
		},
		onSuccess(_data, _variables, _context) {
			queryClient.invalidateQueries({ queryKey: ["users", userId, "assets"] });
			queryClient.invalidateQueries({ queryKey: ["users", userId, "daily"] });

			setTransactionType("spending");
			setAssetTypeId("");
			setRegisteredDate(dayjs(new Date()).format("YYYY-MM-DD"));
			setRegisteredHour("");
			setRegisteredMinute("");
			setAmount(0);
			setMemo("");
		},
		onError(error, _variables, _context) {
			console.log(error);
		},
	});

	// to create a new record
	const onChangeTransactionType: FormEventHandler<HTMLSelectElement> = (event) => setTransactionType(event.currentTarget.value);
	const onChangeAssetTypeId: ChangeEventHandler<HTMLSelectElement> = (event) => setAssetTypeId(event.target.value);
	const onChangeRegisteredDate: ChangeEventHandler<HTMLInputElement> = (event) => setRegisteredDate(event.target.value);
	const onChangeRegisteredHour: ChangeEventHandler<HTMLSelectElement> = (event) => setRegisteredHour(event.target.value);
	const onChangeRegisteredMinute: ChangeEventHandler<HTMLSelectElement> = (event) => setRegisteredMinute(event.target.value);
	const onChangeAmount: ChangeEventHandler<HTMLInputElement> = (event) => {
		const amount = +event.target.value.split(",").join("");
		setAmount(Number.isNaN(amount) ? 0 : amount);
	};
	const onChangeMemo: ChangeEventHandler<HTMLInputElement> = (event) => setMemo(event.target.value);

	const onSubmitForm: FormEventHandler = (event) => {
		event.preventDefault();
		setMessage("");

		if (!assetTypeId || assetTypeId === "none") {
			setMessage("자산을 선택해 주세요");
			return;
		}

		createInput.mutate();
	};

	return (
		<form className={styles.form} onSubmit={onSubmitForm}>
			<select className={styles.selectBox} value={transactionType} onChange={onChangeTransactionType}>
				<option value="spending">지출</option>
				<option value="income">수입</option>
			</select>

			<select className={styles.selectBox} value={assetTypeId} onChange={onChangeAssetTypeId}>
				<option value="none">자산 선택</option>
				{assets?.map((asset) => (
					<option key={asset._id} value={asset._id}>
						{asset.name}
					</option>
				))}
			</select>

			<input className={styles.calendar} id="registeredDate" type="date" placeholder="날짜" value={registeredDate} onChange={onChangeRegisteredDate} />
			<select className={styles.selectBox} value={registeredHour} onChange={onChangeRegisteredHour}>
				{new Array(24).fill(0).map((v, i) => {
					return (
						<option key={i} value={i < 10 ? `0${i}` : i}>
							{i < 10 ? `0${i}` : i}시
						</option>
					);
				})}
			</select>
			<select className={styles.selectBox} value={registeredMinute} onChange={onChangeRegisteredMinute}>
				{new Array(12).fill(0).map((v, i) => {
					return (
						<option key={i} value={i * 5 < 10 ? `0${i * 5}` : i * 5}>
							{i * 5 < 10 ? `0${i * 5}` : i * 5}분
						</option>
					);
				})}
			</select>

			<input id="amount" type="text" placeholder="금액" maxLength={20} value={amount.toLocaleString()} onChange={onChangeAmount} />
			<input className={styles.grownFormInput} id="memo" type="text" placeholder="메모" value={memo} onChange={onChangeMemo} />

			<button className={styles.formButton} type="submit">
				입력하기
			</button>
			{message && <div className={styles.error}>{message}</div>}
		</form>
	);
}
