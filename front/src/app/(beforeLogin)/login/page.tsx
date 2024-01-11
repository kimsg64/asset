"use client";
// react, next
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

// libs
import { useSession, signOut, signIn } from "next-auth/react";

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

    const onChangeId: ChangeEventHandler<HTMLInputElement> = (event) => setId(event.target.value);
    const onChangePassword: ChangeEventHandler<HTMLInputElement> = (event) => setPassword(event.target.value);
    const onSubmitForm: FormEventHandler = async (event) => {
        event.preventDefault();
        try {
            const result = await signIn("credentials", {
                username: id,
                password,
                redirect: false,
            });
            console.log("tried to login!", result);
            router.replace("/home");
        } catch (error) {
            console.log(error);
        }

        // await Apis.post("/user/login", { id, password })
        //     .then((response) => {
        //         // console.log("this is response", response);
        //         router.push(`/`);
        //     })
        //     .catch((error) => {
        //         console.log("this is error", error);
        //         if (axios.isAxiosError(error) && !!error.response) {
        //             setIsError(true);
        //             setError(error.response.data.message);
        //         }
        //     });
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
            <Input id="id" type="email" placeholder="ID" value={id} onChange={onChangeId} />
            <Input id="password" type="password" placeholder="PASSWORD" value={password} onChange={onChangePassword} />
            <button className={Button.default} type="submit">
                SUBMIT!!
            </button>
        </form>
    );
}
