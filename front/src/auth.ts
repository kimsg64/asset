import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import cookie from "cookie";
import { cookies } from "next/headers";

export const {
	handlers: { GET, POST },
	auth,
	signIn,
} = NextAuth({
	pages: {
		signIn: "/login",
		newUser: "/signup",
	},
	providers: [
		GitHub,
		Credentials({
			async authorize(credentials) {
				const response = await fetch(`${process.env.AUTH_URL}/api/user/login`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						id: credentials.username,
						password: credentials.password,
					}),
				});

				console.log("check response!", response.ok);
				const setCookie = response.headers.get("Set-Cookie");
				console.log("setCookie", setCookie);
				if (setCookie) {
					const parsed = cookie.parse(setCookie);
					cookies().set("connect.sid", parsed["connect.sid"], parsed);
				}

				if (!response.ok) {
					return null;
				}

				const user = await response.json();
				console.log("user", user);
				// window.localStorage.setItem("avatar", `data:${user.avatar.contentType};base64,${user.avatar.data.data.toString("base64")}`);

				return {
					name: user.name,
					email: user.id,
				};
			},
		}),
	],
});
