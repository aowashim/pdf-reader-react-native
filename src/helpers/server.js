import axios from 'axios'
//import { SERVER_URL } from '@env'

export const uploadUrl = async uri => {
  let success = false

  try {
    await axios.post('https://pdf-upload.herokuapp.com/upload', {
      uri,
    })

    success = true
    return [success, 'Data uploaded successfully']
  } catch (err) {
    return [success, err.message]
  }
}

export const getAllUrl = async () => {
  let success = false

  try {
    const response = await axios.get('https://pdf-upload.herokuapp.com/all-url')

    success = true
    return [success, response.data]
  } catch (err) {
    return [success, err.message]
  }
}
