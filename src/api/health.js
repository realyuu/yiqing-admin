import request from '@/utils/request'
import {getToken} from "@/utils/auth";

const base = '/health'

export function search(data){
  return request({
    url: base + '/search2',
    method: 'post',
    data
  })
}

export function get(page, limit, role, userId, major){
  return request({
    url: base + base + 's/' + page,
    method: 'get',
    params:{'limit': limit, 'role': role, 'userId': userId, 'major': major}
  })
}

export function add(data){
  return request({
    url: base + '/add',
    method: 'post',
    data
  })
}

export function modify(data) {
  return request({
    url: base + '/modify',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: base + '/delete/' + id,
    method: 'get',
  })
}
