import Background from "./_component/Background";
import FormZone from "./_component/FormZone";
import ItemBoxesZone from "./_component/ItemBoxesZone";

type Props = { params: { userId: string } };

export default function Page({ params }: Props) {
    const { userId } = params;
    console.log("userId!!", userId);
    return (
        <Background>
            <FormZone userId={userId} />
            <ItemBoxesZone userId={userId} />
        </Background>
    );
}
