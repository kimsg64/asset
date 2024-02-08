type Props = { children: React.ReactNode; modal: React.ReactNode };

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
 * children: [userId]/asset/page.tsx
 * modal: [userId]/asset/@modal/default.tsx
 *
 * [userId]/asset/i/[assetTypeId]로 접근 시
 * children: [userId]/asset/i/[assetTypeId]/page.tsx이어야 하지만
 *           [userId]/asset/@modal/i/[assetTypeId]/page.tsx에 의해 라우팅이 intercept 당함
 *           [userId]/asset/i/[assetTypeId]가 아닌 [userId]/asset/@modal/i/[assetTypeId]로 라우팅됨
 * 그런데 이는 두 번째 Props인 modal이므로
 * children: [userId]/asset/page.tsx
 * modal: [userId]/asset/@modal/i/[assetTypeId]/page.tsx
 *
 */
