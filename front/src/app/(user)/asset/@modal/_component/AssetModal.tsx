"use client";
// react, next
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// libs
import axios from "axios";

// custom modules
import Apis from "@/app/api/api";
import { IAsset } from "@interfaces/IFcAsset";

// custom components
import Input from "@/app/_component/Input";

// custom styles
import Button from "@/app/_component/Button.module.css";
import Form from "@/app/_component/Form.module.css";

interface Props {
    assetTypeId: string;
}

export default function Component({ assetTypeId }: Props) {
    const [assetList, setAssetList] = useState<IAsset[]>([]);
    const [sender, setSender] = useState<IAsset | null>(null);
    const [recipient, setRecipient] = useState<IAsset | null>(null);
    const [amount, setAmount] = useState(0);
    const [memo, setMemo] = useState("");
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();

    // [S] useEffect
    useEffect(() => {
        getAssetsList();
    }, []);
    // [E] useEffect

    // [S] event handling
    const onChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!sender) return;
        const amount = +event.target.value.split(",").join("");
        setAmount(Number.isNaN(amount) ? 0 : amount > sender.amount ? sender.amount : amount);
    };
    const onChangeRecipient = (event: React.FormEvent<HTMLSelectElement>) => {
        const recipientId = event.currentTarget.value;
        setRecipient(assetList.find((asset) => asset._id === recipientId)!);
    };
    const onChangeMemo = (event: React.ChangeEvent<HTMLInputElement>) => setMemo(event.target.value);
    const onSubmitForm = async (event: React.FormEvent) => {
        if (!sender || !recipient) return;
        if (amount <= 0) return;
        event.preventDefault();

        try {
            const newTransferReq = {
                senderId: sender._id,
                senderAmount: sender.amount,
                recipientId: recipient._id,
                recipientAmount: recipient.amount,
                amount,
                memo,
            };
            console.log("will be sent!", newTransferReq);
            await Apis.post("/asset/transfer", newTransferReq).then(destroyModal);
        } catch (error) {
            if (axios.isAxiosError(error) && !!error.response) {
                setIsError(true);
                setError(error.response.data.message);
            }
        }
    };

    // [S] reusable functions
    const getAssetsList = async () => {
        try {
            const result = await Apis.get("/asset");
            setAssetList(result.assets);
            setSender(result.assets.find((asset: IAsset) => asset._id === assetTypeId));
            setRecipient(result.assets.filter((asset: IAsset) => asset._id !== assetTypeId)[0]);
        } catch (error) {
            console.log("catch me if you can");
        }
    };
    const destroyModal = () => router.back();
    // [E] reusable functions

    return (
        <div className="w-screen h-screen bg-black bg-opacity-30 fixed z-10 top-0 left-0">
            <form className={`${Form.modal}`} onSubmit={onSubmitForm}>
                <div>
                    <div>{`${sender?.name}(${sender?.amount.toLocaleString()})`}에서</div>
                    <select value={recipient?._id} onChange={onChangeRecipient}>
                        {!!assetList &&
                            assetList
                                .filter((asset: IAsset) => asset._id !== assetTypeId)
                                .map((asset) => <option key={asset._id} value={asset._id}>{`${asset.name}(${asset.amount!.toLocaleString()})`}</option>)}
                    </select>
                    <span>으로</span>
                    <Input id="amount" type="text" placeholder="금액" maxLength={20} value={amount.toLocaleString()} onChange={onChangeAmount} />
                    <span>원 이체</span>
                    <Input id="memo" type="text" placeholder="메모" value={memo} onChange={onChangeMemo} />
                </div>
                <button className={Button.default}>이체</button>
                <button className={Button.default} onClick={destroyModal}>
                    CLOSE
                </button>
            </form>
        </div>
    );
}
