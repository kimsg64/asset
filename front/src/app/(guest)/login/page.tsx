"use client";
// react, next
import { useState } from "react";
import { useRouter } from "next/navigation";

// libs
import axios from "axios";
import { useSession, signOut } from "next-auth/react";

// custom modules
import Apis from "@/app/api/api";

// custom components
import Input from "@/app/_component/Input";

// custom styles
import Form from "@/app/_component/Form.module.css";
import SubTitle from "@/app/_component/SubTitle.module.css";
import Button from "@/app/_component/Button.module.css";

export default function Page() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [isError, setIsError] = useState(false);
    const router = useRouter();
    const { data: session } = useSession();
    // Destructuring => useSession()이 반환하는 객체인 'data'를 session이라는 새로운 변수에 할당

    const onChangeId = (event: React.ChangeEvent<HTMLInputElement>) => setId(event.target.value);
    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);
    const onSubmitForm = async (event: React.FormEvent) => {
        event.preventDefault();
        await Apis.post("/user/login", { id, password })
            .then((response) => {
                console.log("this is response", response);
                router.push(`/asset`);
            })
            .catch((error) => {
                console.log("this is error", error);
                if (axios.isAxiosError(error) && !!error.response) {
                    setIsError(true);
                    setError(error.response.data.message);
                }
            });
    };

    if (isError) {
        router.push(`/error?message=${error}`);
    }

    if (session) {
        return (
            <div>
                <div>ALREADY LOGGED IN!</div>
                <button className={Button.default} onClick={() => signOut()}>
                    SIGN OUT
                </button>
            </div>
        );
    }

    return (
        <form className={Form.user} onSubmit={onSubmitForm}>
            <h3 className={SubTitle.default}>Sign In</h3>
            <Input id="id" type="text" placeholder="ID" value={id} onChange={onChangeId} />
            <Input id="password" type="password" placeholder="PASSWORD" value={password} onChange={onChangePassword} />
            <button className={Button.default} type="submit">
                SUBMIT!!
            </button>
        </form>
    );
}
