const Mock = require('mockjs')
const address = function () {
  const data = {
    code: 0,
    data: ['咸阳']
  }
  return data
}
Mock.setup = { timeout: 1000 }
Mock.mock('/my-app/address', 'post', address)
