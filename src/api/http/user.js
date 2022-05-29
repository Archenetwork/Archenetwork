import { _get, _post, _put } from './request'

export const getUser = id => _get(`/insight-watcher/user/${id}`, null, false, false)
export const addUser = body => _post('/insight-watcher/user', body)
export const updateUser = body => _put('/insight-watcher/user', body)
