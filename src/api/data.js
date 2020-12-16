import qs from 'qs'
import { data } from '../data/test.js'

export function initData(url, params) {
  /*
  return request({
    url: url + '?' + qs.stringify(params, { indices: false }),
    method: 'get'
  })
  */
  const URL = url + '?' + qs.stringify(params, { indices: false })
  console.log('initData.URL:', URL)
  const page = params.page
  const size = params.size
  return Promise.resolve({
    totalElements: data.length,
    content: data.slice((page) * size, (page) * size + size)
  })
}

export function download(url, params) {
  const URL = url + '?' + qs.stringify(params, { indices: false })
  console.log('download.URL:', URL)
  /*
  return request({
    url: url + '?' + qs.stringify(params, { indices: false }),
    method: 'get',
    responseType: 'blob'
  })
  */
  return Promise.resolve()
}
