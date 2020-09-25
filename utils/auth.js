import Router from 'next/router'
import Cookies from 'js-cookie'
import axios from 'axios'
import qs from 'qs'

const API_URL = process.env.API_URL

export const registerUser = (username, email, password) => {
  return new Promise((resolve, reject) => {
    const requestBody = { username, email, password }
    const url = `${API_URL}/auth/local/register`
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    axios.post(url, qs.stringify(requestBody), config)
      .then((res) => {
        // set token response from Strapi for server validation
        Cookies.set('token', res.data.jwt, { expires: 1 })

        // resolve the promise to set loading to false in SignUp form
        resolve(res)

        // redirect back to home page
        Router.push('/')
      })
      .catch((error) => {
        // reject the promise and pass the error object back to the form
        reject(error)
      })
  })
}

export const loginUser = (identifier, password) => {
  // prevent function from being ran on the server
  if (typeof window === 'undefined') {
    return
  }

  return new Promise((resolve, reject) => {
    const requestBody = { identifier, password }
    const url = `${API_URL}/auth/local`
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    axios.post(url, JSON.stringify(requestBody), config)
      .then((res) => {
        // set token response from Strapi for server validation
        Cookies.set('token', res.data.jwt, { expires: 1 })

        // resolve the promise to set loading to false in SignUp form
        resolve(res)

        // redirect back to home page for restaurance selection
        Router.push('/')
      })
      .catch((error) => {
        // reject the promise and pass the error object back to the form
        reject(error)
      })
  })
}

export const logout = () => {
  // remove token and user cookie
  Cookies.remove('token')
  delete window.__user
  // sync logout between multiple windows
  window.localStorage.setItem('logout', Date.now())
  // redirect to the home page
  Router.push('/')
}
