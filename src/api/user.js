import request from '@/utils/request'
import {getToken} from "@/utils/auth";

export function login(data) {
  return request({
    // url: '/admin/login',
    url: '/user/login',
    method: 'post',
    data
  })
}

/* 根据token获取信息 */
export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    headers:{'token': token},
    // params: { token }
  })
}

export function search(keyword){
  return request({
    url: '/user/search/' + keyword,
    method: 'get',
  })
}

export function getUsers(page){
  return request({
    url: '/user/users/' + page,
    method: 'get',
  })
}

export function add(data){
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}



/* 修改信息，修改密码 */
export function modify(data) {
  console.log(data)
  return request({
    url: '/user/modify',
    method: 'post',
    // headers:{'token': getToken()},
    data
  })
}

// export function logout(data) {
//   return request({
//     url: '/admin/logout',
//     method: 'post',
//     data: {"token":data}
//   })
// }
