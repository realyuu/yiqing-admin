import request from '@/utils/request'
import {getToken} from "@/utils/auth";

export function backupList() {
    return request({
        url: '/project/backupList',
        method: 'get',
    })
}

export function backup() {
    return request({
        url: '/project/backupSQL',
        method: 'get',
    })
}

export function rollback(filename){
    return request({
        url: '/project/rollback/' + filename,
        method: 'get',
    })
}