import TkpAxios from '@/utils/TkpAxios'
import Constant from '@/assets/js/constant'
const domain = Constant.contextPath

export const apiAddress = (params) => new TkpAxios(domain).post('/address', params).then((res) => res.data)
