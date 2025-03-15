import axios from 'axios'

export const TMDB_CONFIG = {
  BASE_URL: import.meta.env.VITE_APP_API,
  IMAGE_BASE_URL: import.meta.env.VITE_IMAGE_URL,
  POSTER_SIZE: 'w500',
}

export const API_KEY = import.meta.env.VITE_API_KEY

export const axiosConfig = {
  baseURL: TMDB_CONFIG.BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
}

export const api = axios.create(axiosConfig)
