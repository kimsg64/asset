"use client";
// react, next
import { useState, FormEventHandler, ChangeEventHandler } from "react";

// libs
// import axios from "axios";

// custom modules
// import Apis from "@/app/api/api";
import { IAssetReq } from "@/interfaces/IFcAsset";
// import { getAssets } from "./_lib/getAssets";

// custom components
import Input from "@/app/_component/Input";

// custom styles
import Form from "@/app/_component/Form.module.css";
import Button from "@/app/_component/Button.module.css";

export default function FormZone() {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0);
    const [memo, setMemo] = useState("");
    // const [isError, setIsError] = useState(false);
    // const [error, setError] = useState("");
    // [S] Event Handling
    const onChangeName: ChangeEventHandler<HTMLInputElement> = (event) => setName(event.target.value);
    const onChangeAmount: ChangeEventHandler<HTMLInputElement> = (event) => {
        const amount = +event.target.value.split(",").join("");
        setAmount(Number.isNaN(amount) ? 0 : amount);
    };
    const onChangeMemo: ChangeEventHandler<HTMLInputElement> = (event) => setMemo(event.target.value);

    // 숙청 예정 by Mutation!!
    const onSubmitForm: FormEventHandler = async (event) => {
        event.preventDefault();
        const newAssetReq: IAssetReq = { name, amount, memo };
        console.log("this will be gone!", newAssetReq);
        // try {
        //     await Apis.post("/asset/create", newAssetReq)
        //         .then(getAssets)
        //         .then(() => {
        //             setName("");
        //             setAmount(0);
        //             setMemo("");
        //         });
        // } catch (error) {
        //     if (axios.isAxiosError(error) && !!error.response) {
        //         setIsError(true);
        //         setError(error.response.data.message);
        //     }
        // }
    };
    // [E] Event Handling
    console.log("did you come back?");

    return (
        <form className={Form.asset} onSubmit={onSubmitForm}>
            <Input id="name" type="text" placeholder="자산명" value={name} onChange={onChangeName} />
            <Input id="amount" type="text" placeholder="금액" maxLength={20} value={amount.toLocaleString()} onChange={onChangeAmount} />
            <Input id="memo" type="text" placeholder="메모" value={memo} onChange={onChangeMemo} />

            <button className={Button.default} type="submit">
                CREATE!!!
            </button>
        </form>
    );
}
