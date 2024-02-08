"use client";

import { useQuery } from "@tanstack/react-query";

import { IAsset } from "@/interfaces/IAsset";
import { getAssets } from "@/app/(afterLogin)/[userId]/_lib/getAssets";

import ItemBox from "./ItemBox";
import * as styles from "./itemBoxes.css";

type Props = { userId: string };

export default function ItemBoxesZone({ userId }: Props) {
    const { data: assets } = useQuery<IAsset[], Object, IAsset[], [_1: string, userId: string, _3: string]>({
        queryKey: ["users", userId, "assets"],
        queryFn: getAssets,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
    });

    const moreThanTwo = !!assets && assets.length > 1;
    const totalAmount = assets?.reduce((accumulator, currentAsset) => accumulator + currentAsset.amount, 0) as number;

    return (
        <>
            <section className={styles.gridZone}>
                {assets?.map((asset) => (
                    <ItemBox key={asset._id} asset={asset} userId={userId} isTransferable={moreThanTwo && asset.amount > 0} />
                ))}
            </section>
            <section className={styles.totalZone}>
                <h2>Total</h2>
                <div className={totalAmount >= 0 ? styles.amount : styles.amountMinus}>{totalAmount?.toLocaleString()}</div>
            </section>
        </>
    );
}
