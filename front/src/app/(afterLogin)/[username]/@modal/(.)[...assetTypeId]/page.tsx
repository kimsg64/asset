import TransferModal from "@/app/(afterLogin)/[username]/asset/_component/TransferModal";
type Props = {
    params: { assetTypeId: string[]; username: string };
};

export default function Page({ params }: Props) {
    console.log("intercepting!!!!!!!!", params);
    return <TransferModal assetTypeId={params.assetTypeId[0]} username={params.username} />;
}
