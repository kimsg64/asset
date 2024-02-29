export default function Page() {
	return (
		<div>
			<div>stock input form(use Alpha Vantage)</div>
			<form>
				<div>
					<label>거래소</label>
					<input />
				</div>
				<div>
					<label>티커</label>
					<input />
				</div>
				<div>
					<label>거래 시점 환율</label>
					<input />
				</div>
				<div>
					<label>거래 시점 주가</label>
					<input />
				</div>
				<div>
					<label>거래량</label>
					<input />
				</div>
			</form>
		</div>
	);
}
