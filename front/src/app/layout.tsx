"use client";
import { useRouter } from "next/navigation";
import "./globals.css";
import AuthSession from "@/app/_component/AuthSession";

type Props = {
    children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
    const router = useRouter();
    const onClickHome = () => {
        router.replace("/");
    };
    return (
        <html>
            <body className="layout-default">
                <header className="header" onClick={onClickHome}>
                    Next.JS
                </header>
                <AuthSession>{children}</AuthSession>
            </body>
        </html>
    );
}
