export const storage = () => {
  var uid = new Date().toString()
  var result

  try {
    window.localStorage.setItem(uid, uid)
    result = window.localStorage.getItem(uid) === uid
    window.localStorage.removeItem(uid)
    return result && window.localStorage
  } catch (exception) {
  }
}
