import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    // pages: {
    //     signIn: "/login",
    // },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                // email: { label: "Email", type: "text", placeholder: "Email" },
                name: { label: "Username", type: "text", placeholder: "Username" },
                password: { label: "Password", type: "Password" },
            },
            async authorize(credentials, req) {
                console.log("credentials", credentials);
                console.log("req", req);
                const authResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        id: credentials?.name,
                        password: credentials?.password,
                    }),
                });
                // cookie???

                if (!authResponse.ok) return null;
                const user = await authResponse.json();
                console.log("this is the user@@@@@@@@@@@@@@@@@@@@@", user);
                return user;
            },
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
    ],
    callbacks: {
        jwt({ token }) {
            // console.log("jwt!!!!!!!!!!!!!!", token);
            return token;
        },
        session({ session, newSession, user }) {
            console.log("session!!!!!!!!!!", session, "newSession!!!!!!!!!", newSession, "user!!!!!!", user);
            return session;
        },
    },
    // events: {
    //     signIn(data) {
    //         console.log("auth.ts events signIn", "session" in data && data.session, "token" in data && data.token);
    //     },
    //     signOut(data) {
    //         console.log("auth.ts events signout", "session" in data && data.session, "token" in data && data.token);
    //     },
    //     session(data) {
    //         console.log("auth.ts events session", "session" in data && data.session, "token" in data && data.token);
    //     },
    // },
});

export { handler as GET, handler as POST };
