"use client";
// react, next
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

// libs
import axios from "axios";

// custom modules
import Apis from "@/app/api/api";
import { IDailyInput, IDailyInputReq, TransactionType } from "@/interfaces/IFcDaily";
import { IAsset } from "@/interfaces/IFcAsset";

// custom components
import Input from "@/app/_component/Input";
import TableRow from "./TableRow";
import FiltersBar from "./FiltersBar";

// custom styles
import Form from "@/app/_component/Form.module.css";
import Button from "@/app/_component/Button.module.css";
import TableRowStyle from "./TableRow.module.css";

export default function Page() {
    const [transactionType, setTransactionType] = useState("");
    const [assetTypeId, setAssetTypeId] = useState("");
    const [registeredDate, setRegisteredDate] = useState("");
    const [amount, setAmount] = useState(0);
    const [displayedTotalAmount, setDisplayedTotalAmount] = useState(0);
    const [memo, setMemo] = useState("");
    const [assets, setAssets] = useState<IAsset[]>([]);
    const [dailyRecords, setDailyRecords] = useState<IDailyInput[]>([]);
    // [S] for filter
    const [filteredTransactionType, setFilteredTransactionType] = useState("");
    const [filteredAssetTypeId, setFilteredAssetTypeId] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [keyword, setKeyword] = useState("");
    // [E] for filter
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const passedAssetId = useSearchParams().get("asset");

    const { data: session } = useSession();

    // [S] useEffect
    useEffect(() => {
        getAssets();
    }, []);
    useEffect(() => {
        console.log(`passed asset id: ${passedAssetId}`);
        !!passedAssetId ? (setFilteredAssetTypeId(passedAssetId), getFilteredDailyRecords("", passedAssetId)) : getDailyRecords();
    }, []);
    useEffect(() => {
        // form을 제출하지 않을 때(필터링 등)에도 보이는 합계 값은 업데이트 되어야 하므로 onSubmitForm이 아닌 useEffect에서 계산
        const total = dailyRecords.reduce((accumulator, currentRecord) => {
            return currentRecord.transactionType === "spending" ? accumulator - currentRecord.amount : currentRecord.transactionType === "income" ? accumulator + currentRecord.amount : accumulator;
        }, 0);
        setDisplayedTotalAmount(total);
    }, [dailyRecords]);
    // [E] useEffect

    // [S] event handling
    // to create a new record
    const onChangeTransactionType = (event: React.FormEvent<HTMLSelectElement>) => setTransactionType(event.currentTarget.value);
    const onChangeAssetTypeId = (event: React.FormEvent<HTMLSelectElement>) => setAssetTypeId(event.currentTarget.value);
    const onChangeRegisteredDate = (event: React.ChangeEvent<HTMLInputElement>) => setRegisteredDate(event.target.value);
    const onChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        const amount = +event.target.value.split(",").join("");
        setAmount(Number.isNaN(amount) ? 0 : amount);
    };
    const onChangeMemo = (event: React.ChangeEvent<HTMLInputElement>) => setMemo(event.target.value);
    const onSubmitForm = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            // 1. daily에 new record 저장 후 전체 records 호출
            await createNewSingleRecord();
            await getDailyRecords();
            // await updateDisplayedTotalAmount();
        } catch (error) {
            if (axios.isAxiosError(error) && !!error.response) {
                setIsError(true);
                setError(error.response.data.message);
            }
        }
    };

    // to filter records
    const onChanedgeFilteredTransactionType = (event: React.FormEvent<HTMLSelectElement>) => setFilteredTransactionType(event.currentTarget.value);
    const onChanedgeFilteredAssetTypeId = (event: React.FormEvent<HTMLSelectElement>) => setFilteredAssetTypeId(event.currentTarget.value);
    const onChangeFrom = (event: React.ChangeEvent<HTMLInputElement>) => setFrom(event.currentTarget.value);
    const onChangeTo = (event: React.ChangeEvent<HTMLInputElement>) => setTo(event.currentTarget.value);
    const onChangeKeyword = (event: React.ChangeEvent<HTMLInputElement>) => setKeyword(event.currentTarget.value);
    const onSubmitConditionsForm = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            // get filtered records
            await getFilteredDailyRecords(filteredTransactionType, filteredAssetTypeId, from, to, keyword);
        } catch (error) {
            if (axios.isAxiosError(error) && !!error.response) {
                setIsError(true);
                setError(error.response.data.message);
            }
        }
    };
    const onResetConditions = () => {
        setFilteredTransactionType("");
        setFilteredAssetTypeId("");
        setFrom("");
        setTo("");
        setKeyword("");
        getDailyRecords();
    };
    // [E] event handling

    // [S] reusable functions
    const getAssets = async () => {
        try {
            const assets = await Apis.get(`/asset`);
            // const assets = await Apis.get(`/asset/${session?.user?.name}`);
            console.log("these are assets!!!!!", assets);
            setAssets(assets.assets);
            setAssetTypeId(!!assetTypeId || assets.assets[0]._id);
        } catch (error) {
            console.log("catch me if you can");
        }
    };

    const getDailyRecords = async () => {
        try {
            const records = await Apis.get("/daily");
            console.log("these are records!!!!!", records);
            setDailyRecords(records.records);
            setTransactionType(!!transactionType ? transactionType : ("spending" as TransactionType));
        } catch (error) {
            console.log("there is an error! when you get records");
        }
    };

    const getFilteredDailyRecords = async (filteredTransactionType?: string, filteredAssetTypeId?: string, from?: string, to?: string, keyword?: string) => {
        const conditions = {
            filteredTransactionType: filteredTransactionType === "none" ? "" : filteredTransactionType,
            filteredAssetTypeId: filteredAssetTypeId === "none" ? "" : filteredAssetTypeId,
            from,
            to,
            keyword,
        };
        try {
            const records = await Apis.post("/daily/filter", conditions);
            setDailyRecords(records.records);
            // setTransactionType(!!transactionType ? transactionType : ("spending" as TransactionType));
        } catch (error) {
            console.log("there is an error! when you get records");
        }
    };

    const createNewSingleRecord = async () => {
        try {
            const newDailyInputReq: IDailyInputReq = { transactionType: transactionType as TransactionType, amount, assetTypeId, registeredDate: new Date(registeredDate), memo };
            const createdDailyInput: IDailyInput = await Apis.post("/daily/create", newDailyInputReq);
            console.log("created!", createdDailyInput);
        } catch (error) {
            console.log("there is an error! when you get records");
        }
    };

    // const updateDisplayedTotalAmount = async () => {
    //     try {
    //         await Apis.post(`/asset/update/${assetTypeId}`, { amount, transactionType });
    //     } catch (error) {
    //         console.log("catch me if you can");
    //     }
    // };
    // [E] reusable functions

    return (
        <>
            <form className={Form.asset} onSubmit={onSubmitForm}>
                <label htmlFor="transactionType">
                    <select id="transactionType" value={transactionType} onChange={onChangeTransactionType}>
                        <option value="spending">지출</option>
                        <option value="income">수입</option>
                    </select>
                </label>

                {!!assets && (
                    <label htmlFor="assetTypeId">
                        <select id="assetTypeId" value={assetTypeId} onChange={onChangeAssetTypeId}>
                            {assets.map((asset) => (
                                <option key={asset._id} value={asset._id}>
                                    {asset.name}
                                </option>
                            ))}
                        </select>
                    </label>
                )}
                <Input id="registeredDate" type="date" placeholder="날짜" value={registeredDate} onChange={onChangeRegisteredDate} />
                <Input id="amount" type="text" placeholder="금액" maxLength={20} value={amount.toLocaleString()} onChange={onChangeAmount} />
                <Input id="memo" type="text" placeholder="메모" value={memo} onChange={onChangeMemo} />

                <button className={Button.default} type="submit">
                    CREATE!!!
                </button>
            </form>

            <section className="w-full">
                <FiltersBar
                    assets={assets}
                    filteredTransactionType={filteredTransactionType}
                    onChanedgeFilteredTransactionType={onChanedgeFilteredTransactionType}
                    filteredAssetTypeId={filteredAssetTypeId}
                    onChangeFilteredAssetTypeId={onChanedgeFilteredAssetTypeId}
                    from={from}
                    onChangeFrom={onChangeFrom}
                    to={to}
                    onChangeTo={onChangeTo}
                    keyword={keyword}
                    onChangeKeyword={onChangeKeyword}
                    onSubmitConditionsForm={onSubmitConditionsForm}
                    onResetConditions={onResetConditions}
                />

                <div className={TableRowStyle.header}>
                    <div>구분</div>
                    <div>자산명</div>
                    <div>발생일</div>
                    <div>금액</div>
                    <div>메모</div>
                </div>
                {!!dailyRecords && dailyRecords.map((rec) => <TableRow key={rec._id} {...rec} />)}
                <div className={displayedTotalAmount < 0 ? "text-red-600" : displayedTotalAmount > 0 ? "text-blue-600" : ""}>합계 {displayedTotalAmount.toLocaleString()}</div>
            </section>
        </>
    );
}
