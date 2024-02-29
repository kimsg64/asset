export const showMessage = (messageCode: string) => {
	if (messageCode === "already_exist") return "이미 가입된 계정입니다.";
	if (messageCode === "no_id") return "아이디를 입력하세요.";
	if (messageCode === "no_password") return "비밀번호를 입력하세요.";
	if (messageCode === "no_passwordChecker") return "비밀번호를 확인하세요.";
	if (messageCode === "password_not_matched") return "비밀번호가 일치하지 않습니다.";
	if (messageCode === "no_name") return "이름을 입력하세요.";
	return "";
};
