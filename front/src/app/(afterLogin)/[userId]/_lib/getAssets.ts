import { IAsset } from "@/interfaces/IAsset";
import { QueryFunction } from "@tanstack/react-query";

export const getAssets: QueryFunction<IAsset[], [_1: string, string, _3: string]> = async ({ queryKey }) => {
    const [_1, userId, _3] = queryKey;
    console.log("check user name!!", userId);

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/asset/${userId}`, {
        next: { tags: ["users", userId, "assets"] },
        cache: "no-store",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
};
