export function asyncRequest() {
	return new Promise((res) =>
		setTimeout(() => {
			res('ok');
		}, 3000)
	);
}
