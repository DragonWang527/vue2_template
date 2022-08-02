import TkpAxios from '@/utils/TkpAxios'

export const apiAddress = (params) => new TkpAxios().post('api/address', params).then((res) => res.data)
