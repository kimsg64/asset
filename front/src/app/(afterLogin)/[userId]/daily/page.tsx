// react, next
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

import { getDailyRecords } from "./_lib/getDailyRecords";
import RecordsZone from "./_component/RecordsZone";
import FormZone from "./_component/FormZone";
import SearchFilter from "./_component/SearchFilter";
import * as styles from "./dailyPage.css";

type Props = { params: { userId: string } };

export default async function Page({ params }: Props) {
    const { userId } = params;
    const queryClient = new QueryClient();
    await queryClient.prefetchInfiniteQuery({
        queryKey: ["users", userId, "daily"],
        queryFn: getDailyRecords,
        initialPageParam: 0,
    });
    const dehydratedState = dehydrate(queryClient);
    // const getFilteredDailyRecords = async (filteredTransactionType?: string, filteredAssetTypeId?: string, from?: string, to?: string, keyword?: string) => {
    //     const conditions = {
    //         filteredTransactionType: filteredTransactionType === "none" ? "" : filteredTransactionType,
    //         filteredAssetTypeId: filteredAssetTypeId === "none" ? "" : filteredAssetTypeId,
    //         from,
    //         to,
    //         keyword,
    //     };
    //     try {
    //         const records = await Apis.post("/daily/filter", conditions);
    //         // setDailyRecords(records.records);
    //         // setTransactionType(!!transactionType ? transactionType : ("spending" as TransactionType));
    //     } catch (error) {
    //         console.log("there is an error! when you get records");
    //     }
    // };

    // const updateDisplayedTotalAmount = async () => {
    //     try {
    //         await Apis.post(`/asset/update/${assetTypeId}`, { amount, transactionType });
    //     } catch (error) {
    //         console.log("catch me if you can");
    //     }
    // };
    // [E] reusable functions

    return (
        <HydrationBoundary state={dehydratedState}>
            <FormZone userId={userId} />
            <section className={styles.wrapper}>
                {/* <SearchFilter
                    filteredTransactionType={filteredTransactionType}
                    onChanedgeFilteredTransactionType={onChanedgeFilteredTransactionType}
                    from={from}
                    onChangeFrom={onChangeFrom}
                    to={to}
                    onChangeTo={onChangeTo}
                    keyword={keyword}
                    onChangeKeyword={onChangeKeyword}
                    onSubmitConditionsForm={onSubmitConditionsForm}
                    onResetConditions={onResetConditions}
                /> */}
                <SearchFilter userId={userId} />

                <RecordsZone userId={userId} />
            </section>
        </HydrationBoundary>
    );
}
