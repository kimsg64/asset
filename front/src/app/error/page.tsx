"use client";
// react, next
import { useSearchParams } from "next/navigation";

// custom modules
import SubTitle from "../_component/SubTitle.module.css";

export default function Error() {
    const searchParams = useSearchParams();
    const errorMessage = searchParams.has("message") ? searchParams.get("message") : "There is an error!";
    return (
        <main>
            <div className={SubTitle.default}>{errorMessage}</div>
        </main>
    );
}
