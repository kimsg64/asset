"use client";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

import Button from "@/app/_component/Button.module.css";

export default function Home() {
    const { data: session } = useSession();

    console.log("session data!", session);

    const onClickSignIn = () => signIn();
    const onClickSignOut = () => signOut();

    if (session) {
        return (
            <main>
                <div>Hello, Nexts</div>
                <ul className="flex">
                    <li>작업 ㄱ</li>
                    <li>
                        {/* <Link href={`/asset/${session.user?.name}`} className={Button.small}>
                            자산
                        </Link> */}
                        <Link href={`/asset`} className={Button.small}>
                            자산
                        </Link>
                    </li>
                    <li>
                        <Link href={`/daily/${session.user?.name}`} className={Button.small}>
                            입력
                        </Link>
                    </li>
                </ul>
                <div className="mt-8 mb-2 text-lg font-bold">Stacks</div>
                <div>Next.js(App Router)</div>
                <div>React Query</div>
                <div>TypeScript</div>
                <div>TailwindCss</div>
                <div>Express.js</div>
                <div>MongoDB(mongoose)</div>
                <div className="mt-8 mb-2 text-lg font-bold">To do</div>
                <div className="mb-2">
                    <div>1. Daily Record</div>
                    <div className="text-sm line-through">・CRUD</div>
                    <div className="text-sm line-through">・날짜 내림차순 정렬</div>
                    <div className="text-sm line-through">・현재 표시 중인 Record 통계</div>
                    <div className="text-sm line-through">・기간별, 자산별 필터</div>
                    <div className="text-sm line-through">・메모 검색</div>
                </div>
                <div className="mb-2">
                    <div>2. Asset</div>
                    <div className="text-sm line-through">・CRUD</div>
                    <div className="text-sm line-through">・Daily Inputs과 연결</div>
                    <div className="text-sm line-through">・클릭 시 Daily Inputs에서 해당 Asset 선택된 채로 이동</div>
                    <div className="text-sm line-through">・자산 간 이체 팝업(Dynamic Routing)</div>
                </div>
                <div className="mb-2">
                    <div>
                        3. 로그인/회원가입 마무리
                        <div className="text-sm line-through">・NextAuth로 로그인 인증 구현(OAuth)</div>
                        <div className="text-sm line-through">・NextAuth로 로그인 인증 구현(Credentials)</div>
                        <div className="text-sm text-red-600">・계정 별 Dynamic Routing → Next.auth의 credentials provider로 접근 시, 반환되는 유저 세션에 커스텀 프로퍼티 추가가 안되는 이슈 </div>
                    </div>
                </div>
                <div className="mb-2">
                    <div>
                        4. ReactQuery
                        <div className="text-sm">・mutate 구현(삭제, 업데이트 등)</div>
                        <div className="text-sm">・Infinity Scroll</div>
                    </div>
                </div>
                <div className="mb-2">
                    <div>5. DM 구현</div>
                </div>
                <div className="mb-2">
                    <div>6. 일간, 월간, 연간 통계</div>
                </div>
                <div className="mb-2">
                    <div>7. Graph</div>
                </div>
                <div className="mb-2">
                    <div>8. Axios → Server Components + Fetch로 Migration</div>
                </div>
                <div className="mb-2">
                    <div>9. 언어 전환(한, 영, 일)</div>
                </div>
                <div className="mb-2">
                    <div>10. 테스트 코드 작성</div>
                </div>

                <button className={Button.default} onClick={onClickSignOut}>
                    SIGN OUT
                </button>
            </main>
        );
    }

    return (
        <button className={Button.default} onClick={onClickSignIn}>
            TO LOGIN PAGE
        </button>
    );
}
