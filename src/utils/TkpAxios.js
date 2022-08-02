import axios from 'axios'
import qs from 'qs'
import Security from './Security'
import ContentType from './ContentType'
class TkpAxios {
  constructor(baseUrl = '') {
    // MessageBox.close()
    this._baseUrl = baseUrl
    /* 主要封装axios，方便放到VUE的原型上，直接调用 */
    axios.interceptors.request.use(
      (config) => {
        config.headers.common = this.addJwtToHeader()
        return config
      },
      (err) => {
        // MessageBox.alert('请求超时!')
        return Promise.resolve(err)
      }
    )
    axios.interceptors.response.use(
      (res) => {
        //  后台将jwt存放在响应头里
        // if (res.headers.Authorization) {
        //   Security.saveJwt(res.headers.Authorization)
        // }
        if (res.status && res.status === 200) {
          return res
        }
      },
      (err) => {
        if (err.response.status) {
          switch (err.response.status) {
            case 504 || 404:
              console.log(1)
              break
            case 403:
              console.log(2)
              break
            case 401:
              console.log(3)
              Security.deleteJwt()
          }
        }
        return Promise.resolve(err)
      }
    )
  }

  setBaseUrl(baseUrl) {
    this._baseUrl = baseUrl
  }

  addJwtToHeader() {
    return { Authorization: Security.getJwt() }
  }

  get(url, params) {
    return axios({
      method: 'get',
      url: `${this._baseUrl}${url}`,
      params: params
    })
  }

  /**
   * 默认是postJson
   * @param url
   * @param params
   * @returns {*}
   */
  post(url, params) {
    return this._basePost(url, ContentType.JSON, params)
  }

  postJson(url, params) {
    return this._basePost(url, ContentType.JSON, params)
  }

  postForm(url, params) {
    return this._basePost(url, ContentType.FORM, params)
  }

  _basePost(url, contentType, params) {
    return axios({
      method: 'post',
      url: `${this._baseUrl}${url}`,
      data: params,
      transformRequest: [
        function (data) {
          if (ContentType.FORM === contentType) {
            return qs.stringify(data)
          } else if (ContentType.JSON === contentType) {
            return JSON.stringify(data)
          } else {
            console.error('>>>>>>>>>>>> post error:contentType Not Right', contentType)
            throw Error(`系统错误，contentType=${contentType}`)
          }
        }
      ],
      headers: {
        'Content-Type': contentType
      }
    })
  }
  uploadFile(url, params) {
    return axios({
      method: 'post',
      url: `${this._baseUrl}${url}`,
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default TkpAxios
