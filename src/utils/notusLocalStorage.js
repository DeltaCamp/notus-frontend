// const debug = require('debug')('notus:utils:notusLocalStorage')

// Attempt to use localStorage first, then fallback to cookies
export const notusLocalStorage = {

  // Check for native support
  localStorageSupported: function () {
    try {
      const uid = new Date().getTime().toString()
      window.localStorage.setItem(uid, uid)

      const result = window.localStorage.getItem(uid) === uid
      // debug(window.localStorage.getItem(uid))
      window.localStorage.removeItem(uid)

      if (result) {
        // debug('result', result)
        return true
      }
    } catch (error) {
      // console.error(error)
    }
  },

  write: function (key, value) {
    // If value is detected, set new or modify store
    if (typeof value !== 'undefined' && value !== null) {
      // Convert object values to JSON
      if (typeof value === 'object') {
        value = JSON.stringify(value)
      }
      // Set the store
      if (this.localStorageSupported()) { // Native support
        window.localStorage.setItem(key, value)
        // debug('writing to localstorage')
      } else { // Use Cookie
        this.createCookie(key, value, 30)
      }
    } else if (value === null) {
      if (this.localStorageSupported()) {
        window.localStorage.removeItem(key)
        // debug('removing from localstorage')
      } else { // Use cookie
        this.createCookie(key, '', -1)
      }
    }
  },

  read: function (key) {
    let data

    if (this.localStorageSupported()) {
      data = window.localStorage.getItem(key)
      // debug('reading from localstorage')
    } else {
      data = this.readCookie(key)
    }

    try {
      // debug('parsing JSON data', data)
      data = JSON.parse(data)
    } catch (error) {
      // console.error(error)
    }

    return data
  },

  createCookie: function (key, value) {
    let date = new Date()
    date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000))
    let expires = '; expires=' + date.toGMTString()
    // debug('creating cookie, expires', expires)
    document.cookie = key + '=' + value + expires + '; path=/'
  },

  readCookie: function (key) {
    let nameEQ = key + '='
    let ca = document.cookie.split(';')
    // debug('reading cookie')
    for (let i = 0, max = ca.length; i < max; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  }

}
