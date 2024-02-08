import TransferModal from "@/app/(afterLogin)/[userId]/asset/_component/TransferModal";
type Props = {
    params: { assetTypeId: string[]; userId: string };
};

export default function Page({ params }: Props) {
    console.log("no you never know", params);
    return <TransferModal assetTypeId={params.assetTypeId[0]} userId={params.userId} />;
}
