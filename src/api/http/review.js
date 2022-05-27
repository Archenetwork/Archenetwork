
import { _get } from '@/mock'

// template manage
export const listReview = query => _get('/reviews', query)
