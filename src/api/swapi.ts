import axios from 'axios'

const API_BASE_URL = 'https://swapi.dev/api'

export interface Character {
  name: string
  height: string
  mass: string
  gender: string
  homeworld: string
  films: string[]
  id: number // Add a unique ID for images
}

export interface SWAPIResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export const getPeople = async (
  page: number = 1
): Promise<SWAPIResponse<Character>> => {
  const response = await axios.get(`${API_BASE_URL}/people/?page=${page}`)
  return response.data
}

export const getDetails = async <T>(url: string): Promise<T> => {
  const response = await axios.get(url)
  return response.data
}
