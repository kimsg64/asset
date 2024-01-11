import { GET, POST } from "@/auth";
export { GET, POST };
// import NextAuth from "next-auth/next";
// import GithubProvider from "next-auth/providers/github";
// import CredentialsProvider from "next-auth/providers/credentials";

// export const { handler, auth, signIn } = NextAuth({
//     pages: {
//         signIn: "/login",
//         newUser: "/signup",
//     },
//     providers: [
//         CredentialsProvider({
//             // credentials: {
//             //     name: { label: "Username", type: "text", placeholder: "Username" },
//             //     password: { label: "Password", type: "Password" },
//             // },
//             async authorize(credentials, req) {
//                 console.log("credentials", credentials);
//                 console.log("req", req);
//                 const authResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/login`, {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({
//                         id: credentials?.name,
//                         password: credentials?.password,
//                     }),
//                 });

//                 if (!authResponse.ok) return null;
//                 const user = await authResponse.json();
//                 console.log("this is the user@@@@@@@@@@@@@@@@@@@@@", user);
//                 return user;
//             },
//         }),
//         // GithubProvider({
//         //     clientId: process.env.GITHUB_ID as string,
//         //     clientSecret: process.env.GITHUB_SECRET as string,
//         // }),
//     ],
// });

// // export { handler as GET, handler as POST };
