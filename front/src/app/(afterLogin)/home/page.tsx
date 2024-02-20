import * as styles from "./home.css";
export default function Page() {
	return (
		<main>
			<h1 className={styles.title}>Asset Managemnet App</h1>
			<h2>Read Me</h2>

			<section className={styles.part}>
				<h3 className={styles.subtitle}>개요</h3>
				<ul className={styles.list}>
					<li className={styles.listItem}>사용자 간 공유 가능한 자산 관리 앱</li>
				</ul>
			</section>

			<section className={styles.part}>
				<h3 className={styles.subtitle}>스택</h3>
				<ul className={styles.list}>
					<h4 className={styles.listTitle}>Front</h4>
					<li className={styles.listItem}>Next.js 14 (App Router)</li>
					<li className={styles.listItem}>Typescript</li>
					<li className={styles.listItem}>Next-auth</li>
					<li className={styles.listItem}>Rreact-query</li>
					<li className={styles.listItem}>Zustand</li>
					<li className={styles.listItem}>Vanilla-extract</li>
				</ul>
				<ul className={styles.list}>
					<h4 className={styles.listTitle}>Back</h4>
					<li className={styles.listItem}>Express</li>
					<li className={styles.listItem}>Mongoose (MongoDB)</li>
				</ul>
				<ul className={styles.list}>
					<h5 className={styles.todo}>To do</h5>
					<li className={styles.listItem}>Test Code</li>
				</ul>
			</section>

			<section className={styles.part}>
				<h3 className={styles.subtitle}>구현 기능</h3>
				<ul className={styles.list}>
					<h4 className={styles.listTitle}>사용자</h4>
					<li className={styles.listItem}>회원가입</li>
					<li className={styles.listItem}>로그인</li>
					<li className={styles.listItem}>로그아웃</li>
					<ul className={styles.list}>
						<h5 className={styles.todo}>To Do</h5>
						<li className={styles.listItem}>로그아웃 버그: 로그아웃 후에도 세션이 일시적으로 남아 홈으로 이동</li>
						<li className={styles.listItem}>프로필 이미지 저장</li>
						<li className={styles.listItem}>사용자 정보 조회, 수정, 탈퇴</li>
						<li className={styles.listItem}>가입 시 인증</li>
						<li className={styles.listItem}>SNS 로그인</li>
						<li className={styles.listItem}>DM</li>
						<li className={styles.listItem}>사용자 간 자산 및 기록 공유</li>
					</ul>
				</ul>
				<ul className={styles.list}>
					<h4 className={styles.listTitle}>자산</h4>
					<li className={styles.listItem}>자산 생성, 삭제, 수정, 조회</li>
					<li className={styles.listItem}>자산간 이체</li>
					<li className={styles.listItem}>자산 상세 페이지로 이동</li>
					<li className={styles.listItem}>자산 차트</li>
					<ul className={styles.list}>
						<h5 className={styles.todo}>To Do</h5>
						<li className={styles.listItem}>모달 버그: 모달 생성 시 헤더 사라짐</li>
					</ul>
				</ul>
				<ul className={styles.list}>
					<h4 className={styles.listTitle}>일간 기록</h4>
					<li className={styles.listItem}>기록 생성, 삭제, 조회</li>
					<li className={styles.listItem}>기록 검색</li>
					<li className={styles.listItem}>무한 스크롤</li>
					<ul className={styles.list}>
						<h5 className={styles.todo}>To Do</h5>
						<li className={styles.listItem}>기록 수정</li>
						<li className={styles.listItem}>일간, 월간, 연간 통계</li>
					</ul>
				</ul>
				<ul className={styles.list}>
					<h4 className={styles.listTitle}>UI</h4>
					<li className={styles.listItem}>다크 모드</li>
					<ul className={styles.list}>
						<h5 className={styles.todo}>To Do</h5>
						<li className={styles.listItem}>반응형</li>
						<li className={styles.listItem}>언어 전환(한, 영, 일)</li>
					</ul>
				</ul>
			</section>
		</main>
	);
}
