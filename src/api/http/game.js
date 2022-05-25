import { _get, _post, _put, _delete } from './request'

// game manage
export const listGame = query => _get('/arche/mgt/game', query)
export const getGame = id => _get(`/arche/mgt/game/${id}`)
export const addGame = body => _post('/arche/mgt/game', body)
export const updateGame = body => _put('/arche/mgt/game', body)
export const onlineGame = body => _put('/arche/mgt/game/online', body)
export const deleteGame = id => _delete(`/arche/mgt/game/${id}`)

// game tag
export const listTag = query => _get('/arche/mgt/tags', query)
export const addTag = body => _post('/arche/mgt/tags', body)
export const updateTag = body => _put('/arche/mgt/tags', body)
export const deleteTag = id => _delete(`/arche/mgt/tags/${id}`)

// game category
export const listCategory = query => _get('/arche/mgt/category', query)
export const addCategory = body => _post('/arche/mgt/category', body)
export const updateCategory = body => _put('/arche/mgt/category', body)
export const deleteCategory = id => _delete(`/arche/mgt/category/${id}`)
