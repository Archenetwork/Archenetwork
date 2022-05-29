import { _upload, _get } from './request'
import { jsonToFormData } from 'utils/func'

export const uploadImage = (data, config) => {
  const body = jsonToFormData(data)
  return _upload('/api/Upload_All_In_One', body, config)
}

export const getMessageInfo = () => {
  return Promise.resolve({
    items: [
      { id: 1, title: 'message1', content: '', time: '1 mins age' },
      { id: 2, title: 'message2', content: '', time: '10 mins age' },
      { id: 3, title: 'message3', content: '', time: '23 mins age' },
      { id: 4, title: 'message4', content: '', time: '32 mins age' },
      { id: 5, title: 'message5', content: '', time: '36 mins age' },
    ],
    count: 5,
  })
}

// get current time
export const getCurrentTime = () => {
  return _get('/insight-watcher/time', true)
}
