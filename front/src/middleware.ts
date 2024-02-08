import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const session = auth();
    if (!session) {
        console.log("gimme session!!!");
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/home", "/[userId]/asset", "/[userId]/daily"],
};
