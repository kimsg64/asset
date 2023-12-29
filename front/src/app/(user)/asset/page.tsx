"use client";
// react, next
import React, { useState, useEffect } from "react";

// libs
import axios from "axios";

// custom modules
import Apis from "@/app/api/api";
import { IAsset, IAssetReq } from "@interfaces/IFcAsset";

// custom components
import Input from "@/app/_component/Input";
import ItemBox from "./ItemBox";

// custom styles
import Form from "@/app/_component/Form.module.css";
import Button from "@/app/_component/Button.module.css";

export default function Page() {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0);
    const [memo, setMemo] = useState("");
    const [assets, setAssets] = useState<IAsset[]>([]);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState("");

    // [S] useEffect
    useEffect(() => {
        getAssets();
    }, []);
    // [E] useEffect

    // [S] Event Handling
    const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value);
    const onChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        const amount = +event.target.value.split(",").join("");
        setAmount(Number.isNaN(amount) ? 0 : amount);
    };
    const onChangeMemo = (event: React.ChangeEvent<HTMLInputElement>) => setMemo(event.target.value);
    const onSubmitForm = async (event: React.FormEvent) => {
        event.preventDefault();
        const newAssetReq: IAssetReq = { name, amount, memo };
        console.log("this will be gone!", newAssetReq);
        try {
            await Apis.post("/asset/create", newAssetReq).then(getAssets).then(resetInputs);
        } catch (error) {
            if (axios.isAxiosError(error) && !!error.response) {
                setIsError(true);
                setError(error.response.data.message);
            }
        }
    };
    // [E] Event Handling

    // [S] Reusable Functions
    const getAssets = async () => {
        const assets = await Apis.get("/asset");
        console.log("check this assets", assets);
        setAssets(assets.assets);
    };

    const resetInputs = () => {
        setName("");
        setAmount(0);
        setMemo("");
    };
    // [E] Reusable Functions

    return (
        <>
            <form className={Form.asset} onSubmit={onSubmitForm}>
                <Input id="name" type="text" placeholder="자산명" value={name} onChange={onChangeName} />
                <Input id="amount" type="text" placeholder="금액" maxLength={20} value={amount.toLocaleString()} onChange={onChangeAmount} />
                <Input id="memo" type="text" placeholder="메모" value={memo} onChange={onChangeMemo} />

                <button className={Button.default} type="submit">
                    CREATE!!!
                </button>
            </form>
            <section className="w-full mt-4 grid grid-cols-3 gap-4">{!!assets && assets.map((asset) => <ItemBox key={asset._id} asset={asset} />)}</section>
        </>
    );
}
