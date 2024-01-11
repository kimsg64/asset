import RQProvider from "./_component/RQProvider";

interface Props {
    children: React.ReactNode;
}

export default function Layout({ children }: Props) {
    return <RQProvider>{children}</RQProvider>;
}
