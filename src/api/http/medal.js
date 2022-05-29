import { _get } from './request'

export const listMedal = query => _get('/insight-watcher/medal', query, true)
