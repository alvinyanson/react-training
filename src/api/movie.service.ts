import { MovieResponse } from '../types/movie'

export const IMAGE_CDN = 'https://image.tmdb.org/t/p/w300'

export const FALLBACK_IMAGE = 'https://placehold.co/282x158.png'

const BASE_URL = 'https://api.themoviedb.org/3/movie/popular'

const KEY = 'a74e8d76782da6fe2b3d1cf5ebfdb505' // for demo purposes only

export const fetchMovies = async (page: number = 1): Promise<MovieResponse> => {
  const res = await fetch(`${BASE_URL}?api_key=${KEY}&page=${page}`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}
