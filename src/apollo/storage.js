export const storage = (function() {
	var uid = new Date().toString();
	var result;
	try {
		localStorage.setItem(uid, uid);
		result = localStorage.getItem(uid) === uid;
		localStorage.removeItem(uid);
		return result && localStorage;
	} catch (exception) {}
}());
