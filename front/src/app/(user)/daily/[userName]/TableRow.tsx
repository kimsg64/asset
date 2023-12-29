// react, next
import React, { useEffect, useState } from "react";
// custom modules
import Apis from "@/app/api/api";
import { IDailyInput } from "@interfaces/IFcDaily";
// custom styles
import Button from "@/app/_component/Button.module.css";
import TableRowStyle from "./TableRow.module.css";

export default function Component({ transactionType, amount, assetTypeId, registeredDate, memo, owner, _id, transferTo }: IDailyInput) {
    const [assetName, setAssetName] = useState("");
    useEffect(() => {
        // console.log("check asset type id", assetTypeId);
        getAssetName();
    }, [assetTypeId]);

    const onClickRemove = async () => {
        console.log("try to remove this record!", _id);
        try {
            await Apis.post("/daily/delete", { _id, assetTypeId }).then((res) => {
                console.log("deleted!", res);
            });
        } catch (error) {
            console.log("cannot delete that one...");
        }
    };

    const getAssetName = async () => {
        const result = await Apis.get(`/asset/${assetTypeId}`);
        console.log("asset!!!", result.asset);
        setAssetName(result.asset.name);
    };

    return (
        <ul className={TableRowStyle.default} key={_id}>
            <li>{transactionType === "income" ? <span className="text-blue-600">수입</span> : transactionType === "spending" ? <span className="text-red-600">지출</span> : <span>이체</span>}</li>
            <li>{assetName}</li>
            <li>{registeredDate.toLocaleString("ko-KR", { timeZone: "UTC" })}</li>
            <li>{amount.toLocaleString()}</li>
            <li>{memo}</li>
            <button className={Button.small} type="button" onClick={onClickRemove}>
                DELETE!
            </button>
        </ul>
    );
}
