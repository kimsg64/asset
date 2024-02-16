"use client";
import TransferModal from "@/app/(afterLogin)/[userId]/asset/_component/TransferModal";
import DeleteModal from "@/app/(afterLogin)/[userId]/asset/_component/DeleteModal";
import { useSearchParams } from "next/navigation";

type Props = { params: { assetTypeId: string[]; userId: string } };

export default function Page({ params }: Props) {
	const searchParams = useSearchParams();
	console.log("intercepting!!!!!!!!", params, searchParams.get("type"));
	if (searchParams.get("type") === "delete") {
		const assetName = searchParams.get("name")!;
		return <DeleteModal assetTypeId={params.assetTypeId[0]} assetName={assetName} userId={params.userId} />;
	}
	return <TransferModal assetTypeId={params.assetTypeId[0]} userId={params.userId} />;
}
