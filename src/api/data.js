import qs from 'qs'
import { data } from '@/data/test.js'
import dicts from '@/data/dicts.js'
// import request from '@/utils/request'

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

  const content = url === 'api/dict' ? dicts.content : (url === 'api/dict-detail' ? getDictDetail(dicts, params) : data)

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        totalElements: content.length,
        content: content.slice((page) * size, (page) * size + size)
      })
    }, 300)
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
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({})
    }, 300)
  })
}

function getDictDetail (dicts, params) {
  for (const dict of dicts.content) {
    if (dict.name === params.dictName) {
      return dict.dictDetails
    }
  }
  return []
}
