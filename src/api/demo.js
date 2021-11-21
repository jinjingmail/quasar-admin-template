import qs from 'qs'
/*
 * 几个固定都得有的api
 */

export function add(data) {
  console.log('api demo add.data:', qs.stringify(data, { indices: false }))
  /* return request({
    url: 'api/users',
    method: 'post',
    data
  })*/
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({})
    }, 300)
  })
}

export function del(ids) {
  console.log('api demo del.ids:', qs.stringify(ids, { indices: false }))
  /* return request({
    url: 'api/users',
    method: 'delete',
    data: ids
  })*/
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({})
    }, 300)
  })
}

export function edit(data) {
  console.log('api demo edit.data:', qs.stringify(data, { indices: false }))
  /* return request({
    url: 'api/users',
    method: 'put',
    data
  })*/
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({})
    }, 300)
  })
}

export default { add, edit, del }
