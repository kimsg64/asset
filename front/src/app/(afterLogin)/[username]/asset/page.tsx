import FormZone from "./_component/FormZone";
import ItemBoxesZone from "./_component/ItemBoxesZone";

type Props = { params: { username: string } };

export default function Page({ params }: Props) {
    return (
        <>
            <FormZone />
            <ItemBoxesZone username={params.username} />
        </>
    );
}
