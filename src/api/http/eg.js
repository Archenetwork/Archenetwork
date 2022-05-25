/*
 * @Descripttion: example
 * @Author: pujianguo
 * @Date: @Date: 2022-05-22 23:12:59
 */
import { _get, _post, _put, _delete } from './request'

// eg: task
export const listTask = query => _get('/arche/task', query)
export const addTask = body => _post('/arche/task', body)
export const updateTask = (id, body) => _put(`/arche/task/${id}`, body)
export const deleteTask = id => _delete(`/arche/task/${id}`)
