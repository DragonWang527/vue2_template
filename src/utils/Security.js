class Security {
  static _jwtKeyName = 'Jwt_Tkoen'

  static getJwt() {
    return sessionStorage.getItem(Security._jwtKeyName)
  }

  static saveJwt(jwt) {
    sessionStorage.setItem(Security._jwtKeyName, jwt)
  }

  static deleteJwt() {
    sessionStorage.removeItem(Security._jwtKeyName)
  }

  static loginByUrlToken() {
    let jwtToken = Security.getUrlParam('token')
    if (!jwtToken) {
      return
    }
    this.saveJwt(jwtToken)
  }

  static isLogin() {
    let jwt = Security.getJwt()
    if (!jwt) {
      return false
    }
    return true
  }

  static getUrlParam(paraName) {
    let url = document.location.toString()
    let arrObj = url.split('?')
    if (arrObj.length > 1) {
      let arrPara = arrObj[1].split('&')
      let arr
      for (let i = 0; i < arrPara.length; i++) {
        arr = arrPara[i].split('=')
        if (arr != null && arr[0] === paraName) {
          return arr[1]
        }
      }
      return ''
    } else {
      return ''
    }
  }

  static login() {
    // TODO 待实现
    return this.isLogin()
  }
}
export default Security
