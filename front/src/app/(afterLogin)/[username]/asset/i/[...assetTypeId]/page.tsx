import TransferModal from "@/app/(afterLogin)/[username]/asset/_component/TransferModal";
type Props = {
    params: { assetTypeId: string[]; username: string };
};

export default function Page({ params }: Props) {
    console.log("no you never know", params);
    return <TransferModal assetTypeId={params.assetTypeId[0]} username={params.username} />;
    // return "인터셉트를 당하고도 그렇게 살거야?";
}