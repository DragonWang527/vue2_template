class HandleWebStorage {
  static setSession(key, value) {
    window.sessionStorage.setItem(`Tkp-${key}`, JSON.stringify(value))
  }

  static getSession(key) {
    return JSON.parse(window.sessionStorage.getItem(`Tkp-${key}`))
  }

  static removeSession(key) {
    window.sessionStorage.removeItem(`Tkp-${key}`)
  }

  static setLocal(key, value) {
    window.localStorage.setItem(`Tkp-${key}`, JSON.stringify(value))
  }

  static getLocal(key) {
    return JSON.parse(window.localStorage.getItem(`Tkp-${key}`))
  }

  static removeLocal(key) {
    window.localStorage.removeItem(`Tkp-${key}`)
  }
}

export default HandleWebStorage
