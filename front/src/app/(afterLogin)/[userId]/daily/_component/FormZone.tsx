"use client";
// react, next
import { ChangeEventHandler, FormEvent, FormEventHandler, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

// custom modules
import { IAsset } from "@/interfaces/IAsset";
import { IDailyInputReq, TransactionType } from "@/interfaces/IDaily";
import { getAssets } from "../../_lib/getAssets";
import * as styles from "./formZone.css";

type Props = { userId: string };

export default function FormZone({ userId }: Props) {
    const [transactionType, setTransactionType] = useState("spending");
    const [assetTypeId, setAssetTypeId] = useState("");
    const [registeredDate, setRegisteredDate] = useState(dayjs(new Date()).format("YYYY-MM-DD"));
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

    if (assets?.length === 0) {
        alert("you should have at least ONE asset!");
        router.push(`/${userId}/asset`);
    }

    const createInput = useMutation({
        mutationFn: async (event: FormEvent) => {
            event.preventDefault();
            setMessage("");

            if (!assetTypeId || assetTypeId === "none") {
                setMessage("자산을 선택해 주세요");
                return;
            }

            const newDailyInputReq: IDailyInputReq = { transactionType: transactionType as TransactionType, amount, assetTypeId, registeredDate: new Date(registeredDate), memo, ownerId: userId };
            return fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/daily/create`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json; charset=UTF-8" },
                body: JSON.stringify(newDailyInputReq),
            });
        },
        onSuccess(data, variables, context) {
            console.log("added!", data);
        },
        onError(error, variables, context) {
            console.log(error);
        },
    });
    const deleteInput = useMutation({
        mutationFn: async (event) => {
            return fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/daily/delete`, {
                method: "delete",
                credentials: "include",
            });
        },
        onSuccess(data, variables, context) {
            console.log("deleted", data);
        },
        onError(error, variables, context) {
            console.log(error);
        },
    });
    console.log("registered", registeredDate);

    // to create a new record
    const onChangeTransactionType: FormEventHandler<HTMLSelectElement> = (event) => setTransactionType(event.currentTarget.value);
    const onChangeAssetTypeId: ChangeEventHandler<HTMLSelectElement> = (event) => setAssetTypeId(event.target.value);
    const onChangeRegisteredDate: ChangeEventHandler<HTMLInputElement> = (event) => {
        console.log("date", event.target.value, typeof event.target.value);
        setRegisteredDate(event.target.value);
    };
    const onChangeAmount: ChangeEventHandler<HTMLInputElement> = (event) => {
        const amount = +event.target.value.split(",").join("");
        setAmount(Number.isNaN(amount) ? 0 : amount);
    };
    const onChangeMemo: ChangeEventHandler<HTMLInputElement> = (event) => setMemo(event.target.value);

    return (
        <form className={styles.form} onSubmit={createInput.mutate}>
            <select className={styles.selectBox} id="transactionType" value={transactionType} onChange={onChangeTransactionType}>
                <option value="spending">지출</option>
                <option value="income">수입</option>
            </select>

            {/* <AssetSelectBox parentName="form" userId={userId} /> */}
            <select className={styles.selectBox} id="assetType" value={assetTypeId} onChange={onChangeAssetTypeId}>
                <option value="none">자산 선택</option>
                {assets?.map((asset) => (
                    <option key={asset._id} value={asset._id}>
                        {asset.name}
                    </option>
                ))}
            </select>

            <input className={styles.calendar} id="registeredDate" type="date" placeholder="날짜" value={registeredDate} onChange={onChangeRegisteredDate} />
            <input id="amount" type="text" placeholder="금액" maxLength={20} value={amount.toLocaleString()} onChange={onChangeAmount} />
            <input className={styles.grownFormInput} id="memo" type="text" placeholder="메모" value={memo} onChange={onChangeMemo} />

            <button className={styles.formButton} type="submit">
                입력하기
            </button>
            {message && <div className={styles.error}>{message}</div>}
        </form>
    );
}
