import { _get } from './request'
import { _get as _mockGet } from '@/mock'

export const listMedal = query => _mockGet('/medals', query, true)
export const listMedal1 = query => _get('/insight-watcher/medal', query, true)
