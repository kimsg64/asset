type Props = { queryKey: string[]; pageParam?: number };

export const getFilteredRecords = async ({ queryKey, pageParam }: Props) => {
    const [_1, userId, _3] = queryKey;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/daily/${userId}?cursor=${pageParam}`, {
        next: { tags: ["users", userId, "daily", "filtered"] },
        cache: "no-store",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
};
