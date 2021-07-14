import qs from 'qs'
/*
 * 几个固定都得有的api
 */

export function add(data) {
  console.log('api dictDetail add.data:', qs.stringify(data, { indices: false }))
  /* return request({
    url: 'api/dict-detail',
    method: 'post',
    data
  })*/
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({})
    }, 700)
  })
}

export function del(ids) {
  console.log('api dictDetail del.ids:', qs.stringify(ids, { indices: false }))
  /* return request({
    url: 'api/dict-detail',
    method: 'delete',
    data: ids
  })*/
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({})
    }, 700)
  })
}

export function edit(data) {
  console.log('api dictDetail edit.data:', qs.stringify(data, { indices: false }))
  /* return request({
    url: 'api/dict-detail',
    method: 'put',
    data
  })*/
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({})
    }, 700)
  })
}

export default { add, edit, del }
