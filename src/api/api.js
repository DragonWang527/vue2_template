import TkpAxios from '@/utils/TkpAxios'
// baseurl
const domain = '/my-app'

export const apiAddress = (params) => new TkpAxios(domain).post('/addres', params).then((res) => res.data)
