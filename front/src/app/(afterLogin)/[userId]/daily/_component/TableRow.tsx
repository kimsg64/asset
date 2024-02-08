// react, next
import React, { useEffect, useState } from "react";
// custom modules
import { IDailyInput } from "@/interfaces/IDaily";
// custom styles
import TableRowStyle from "./TableRow.module.css";

export default function TableRow({ transactionType, amount, assetTypeId, registeredDate, memo, _id, transferTo }: IDailyInput) {
    const [assetName, setAssetName] = useState("");
    useEffect(() => {
        // console.log("check asset type id", assetTypeId);
        getAssetName();
    }, [assetTypeId]);

    const onClickDelete = async () => {
        console.log("try to delete this record!", _id);
        try {
            // await Apis.post("/daily/delete", { _id, assetTypeId }).then((res) => {
            //     console.log("deleted!", res);
            // });
        } catch (error) {
            console.log("cannot delete that one...");
        }
    };

    const getAssetName = async () => {
        // const result = await Apis.get(`/asset/${assetTypeId}`);
        // console.log("asset!!!", result.asset);
        // setAssetName(result.asset?.name);
    };

    return (
        <ul className={TableRowStyle.default} key={_id}>
            <li>{transactionType === "income" ? <span className="text-blue-600">수입</span> : transactionType === "spending" ? <span className="text-red-600">지출</span> : <span>이체</span>}</li>
            <li>{assetName}</li>
            <li>{registeredDate.toLocaleString("ko-KR", { timeZone: "UTC" })}</li>
            <li>{amount.toLocaleString()}</li>
            <li>{memo}</li>
            <button type="button" onClick={onClickDelete}>
                DELETE!
            </button>
        </ul>
    );
}
