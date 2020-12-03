import axios from 'axios'
import qs from 'qs'

const { CMS_URL } = process.env

export const registerUser = (username, email, password) => {
  // prevent function from being ran on the server
  if (typeof window === 'undefined') {
    return
  }

  const requestBody = { username, email, password }
  const url = `${CMS_URL}/auth/local/register`
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  return axios.post(url, qs.stringify(requestBody), config)
}

export const loginUser = (identifier, password) => {
  const requestBody = { identifier, password }
  const url = `${CMS_URL}/auth/local`
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return axios.post(url, JSON.stringify(requestBody), config)
}

export const authUser = (token) => {
  return axios.get(`${CMS_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}