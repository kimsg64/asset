// import ThemeProvider from "./_component/ThemeProvider";
import "./globalTheme.css";
import AuthSession from "@/app/_component/AuthSession";

type Props = { children: React.ReactNode };

export default async function RootLayout({ children }: Props) {
	return (
		<html>
			<body>
				{/* <ThemeProvider> */}
				<AuthSession>{children}</AuthSession>
				{/* </ThemeProvider> */}
			</body>
		</html>
	);
}
