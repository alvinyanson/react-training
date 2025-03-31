import { createContext, useContext } from 'react'
import { WatchList } from '../store/watch-list-store'

export const WatchListContext = createContext<WatchList>(null!)

export const useWatchList = () => useContext(WatchListContext)
