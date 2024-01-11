import RQProvider from "./_component/RQProvider";

interface Props {
    children: React.ReactNode;
    modal: React.ReactNode;
}

export default function Layout({ children, modal }: Props) {
    return (
        <RQProvider>
            {children}
            {modal}
        </RQProvider>
    );
}
