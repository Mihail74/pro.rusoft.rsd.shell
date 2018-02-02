import axios from 'axios'

export const withAuthorization = (authorization, config = {}) => ({
  config,
  headers: {
    ...config.headers,
    Authorization: `Bearer ${authorization}`
  }
})

export const BACKEND = axios.create({
  baseURL: window.__APP_CONFIG__.api.url
})

export const WS = {
  url: 'ws://172.27.30.141:15674/ws',
  login: 'admin',
  password: 'password'
}
