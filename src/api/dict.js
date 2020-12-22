import qs from 'qs'
/*
 * 几个固定都得有的api
 */

export function add(data) {
  console.log('api dict add.data:', qs.stringify(data, { indices: false }))
  /* return request({
    url: 'api/dict',
    method: 'post',
    data
  })*/
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({})
    }, 500)
  })
}

export function del(ids) {
  console.log('api dict del.ids:', qs.stringify(ids, { indices: false }))
  /* return request({
    url: 'api/dict',
    method: 'delete',
    data: ids
  })*/
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({})
    }, 500)
  })
}

export function edit(data) {
  console.log('api dict edit.data:', qs.stringify(data, { indices: false }))
  /* return request({
    url: 'api/dict',
    method: 'put',
    data
  })*/
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({})
    }, 500)
  })
}

export default { add, edit, del }
