import { useQuery } from "@tanstack/react-query";

import { IAsset } from "@/interfaces/IFcAsset";
import { getAssets } from "../_lib/getAssets";

import ItemBox from "./ItemBox";

type Props = { username: string };

export default function ItemBoxesZone({ username }: Props) {
    const { data: assets } = useQuery<IAsset[]>({
        queryKey: ["asset"],
        queryFn: getAssets,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
    });

    return (
        <section className="w-full mt-4 grid grid-cols-3 gap-4">
            {assets?.map((asset) => (
                <ItemBox key={asset._id} asset={asset} username={username} />
            ))}
        </section>
    );
}
