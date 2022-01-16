import { baseAxios } from '../utils/axios'

// 获取所有skill
export function getSkill (params) {
    return baseAxios({
        url: '/api/skill/all',
        method: 'get',
        data: params,
    })
}
// 获取指定skill
export function getSkillId (id, address) {
    return baseAxios({
        url: `/api/skill/${id}?address=${address}`,
        method: 'get',
    })
}
// 获取指定task
export function getTaskId (id) {
    return baseAxios({
        url: `/api/task/${id}`,
        method: 'get',
    })
}
// 开始task
export function getTaskStart (id, data) {
    return baseAxios({
        url: `/api/task/${id}/start`,
        method: 'post',
        data
    })
}
// 查询user
export function getUser (address) {
    return baseAxios({
        url: `/api/user/${address}`,
        method: 'get'
    })
}
// x新增user
export function getAddUser (address) {
    return baseAxios({
        url: `/api/user/${address}`,
        method: 'put'
    })
}
// 获取推荐关系
export function getRelation (address) {
    return baseAxios({
        url: `/api/referral/${address}`,
        method: 'get'
    })
}
// 建立推荐关系
export function postRelation (data) {
    return baseAxios({
        url: `/api/referral`,
        method: 'post',
        data
    })
}