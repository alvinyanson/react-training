import { MovieResponse } from '@/type/movie'

export const IMAGE_CDN = import.meta.env.VITE_IMAGE_CDN

export const FALLBACK_IMAGE = import.meta.env.VITE_FALLBACK_IMAGE

const BASE_URL = import.meta.env.VITE_MOVIE_DB_URL

const KEY = import.meta.env.VITE_KEY // for demo purposes only

export const fetchMovies = async (page: number = 1): Promise<MovieResponse> => {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${KEY}&page=${page}`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}
