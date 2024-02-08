import Header from "./_component/Header";
import RQProvider from "./_component/RQProvider";

type Props = { children: React.ReactNode };

export default async function Layout({ children }: Props) {
    return (
        <>
            <Header />
            <RQProvider>{children}</RQProvider>
        </>
    );
}
