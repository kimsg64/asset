import AssetModal from "../_component/AssetModal";
type Props = {
    params: { assetTypeId: string };
};

export default function Page({ params }: Props) {
    console.log("routing!!!!!!!!", params);
    return <AssetModal assetTypeId={params.assetTypeId} />;
}
