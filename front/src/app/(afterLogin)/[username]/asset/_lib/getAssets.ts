export const getAssets = async () => {
    const res = await fetch(`http://localhost:8080/api/asset`, {
        next: {
            tags: ["asset"],
        },
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
};
