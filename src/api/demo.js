import qs from 'qs'
/*
 * 几个固定都得有的api
 */

export function add(data) {
  console.log('add.data:', qs.stringify(data, { indices: false }))
  /* return request({
    url: 'api/users',
    method: 'post',
    data
  })*/
  return Promise.resolve({})
}

export function del(ids) {
  console.log('del.ids:', qs.stringify(ids, { indices: false }))
  /* return request({
    url: 'api/users',
    method: 'delete',
    data: ids
  })*/
  return Promise.resolve({})
}

export function edit(data) {
  console.log('edit.data:', qs.stringify(data, { indices: false }))
  /* return request({
    url: 'api/users',
    method: 'put',
    data
  })*/
  return Promise.resolve({})
}

export default { add, edit, del }
