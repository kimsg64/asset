"use client";

// react, next
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// libs
import { useSession } from "next-auth/react";

// custom modules
import Apis from "@/app/api/api";
import { IAsset } from "@interfaces/IFcAsset";

// custom styles
import Button from "@/app/_component/Button.module.css";
import Subtitle from "@/app/_component/Subtitle.module.css";
import Input from "@/app/_component/Input";

type Props = {
    asset: IAsset;
};

export default function Component({ asset }: Props) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [name, setName] = useState("");
    const [memo, setMemo] = useState("");
    const { data: session } = useSession();
    const router = useRouter();

    const onClickStartToUpdate = () => setIsUpdating(true);
    const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value);
    const onChangeMemo = (event: React.ChangeEvent<HTMLInputElement>) => setMemo(event.target.value);

    const onSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("form event!", name, memo);
        await Apis.post(`asset/update/${asset._id}`, { name, memo });
        onClickCancel();
        // mutate 필요함
    };
    const onClickCancel = () => (setIsUpdating(false), setName(""), setMemo(""));

    if (!session) router.push("/");

    return (
        <form className="p-4 rounded bg-pink-100 " key={asset._id} onSubmit={onSubmitForm}>
            {isUpdating ? <Input id="name" placeholder={asset.name} type="text" value={name} onChange={onChangeName} /> : <div className={Subtitle.small}>{asset.name}</div>}
            <div>{asset.amount!.toLocaleString()}</div>
            {isUpdating ? <Input id="memo" placeholder={asset.memo} type="text" value={memo} onChange={onChangeMemo} /> : <div>{asset.memo}</div>}
            <div>
                {/* <Link href={`/${session?.user?.name}/${asset._id}`} className={Button.small}> */}
                <Link href={`/asset/${asset._id}`} className={Button.small}>
                    이체
                </Link>
                <Link href={{ pathname: `/daily/${session?.user?.name}`, query: { asset: asset._id } }} className={Button.small}>
                    상세
                </Link>
                {isUpdating ? (
                    <>
                        <button className={Button.small} type="submit">
                            수정 완료
                        </button>
                        <button className={Button.small} type="button" onClick={onClickCancel}>
                            수정 취소
                        </button>
                    </>
                ) : (
                    <button className={Button.small} type="button" onClick={onClickStartToUpdate}>
                        수정
                    </button>
                )}
            </div>
        </form>
    );
}
