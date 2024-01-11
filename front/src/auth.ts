import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

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
                        username: credentials.username,
                        password: credentials.password,
                    }),
                });

                if (!response.ok) {
                    return null;
                }

                const user = await response.json();

                return user;
            },
        }),
    ],
});
