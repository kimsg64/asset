interface Props {
    children: React.ReactNode;
    modal: React.ReactNode;
}

export default function Layout({ children, modal }: Props) {
    return (
        <>
            {children}
            {modal}
        </>
    );
}

/**
 * 기본
 * children: [username]/asset/page.tsx
 * modal: [username]/asset/@modal/default.tsx
 *
 * [username]/asset/i/[assetTypeId]로 접근 시
 * children: [username]/asset/i/[assetTypeId]/page.tsx이어야 하지만
 *           [username]/asset/@modal/i/[assetTypeId]/page.tsx에 의해 라우팅이 intercept 당함
 *           [username]/asset/i/[assetTypeId]가 아닌 [username]/asset/@modal/i/[assetTypeId]로 라우팅됨
 * 그런데 이는 두 번째 Props인 modal이므로
 * children: [username]/asset/page.tsx
 * modal: [username]/asset/@modal/i/[assetTypeId]/page.tsx
 *
 */
