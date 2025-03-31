import { useState } from 'react'
import { WatchListContext } from '../hooks/useWatchlist'
import { WatchList } from '../store/watch-list-store'

type Props = {
  children: React.ReactNode
}

export const WatchListContextProvider = ({ children }: Props) => {
  const [store] = useState(new WatchList([]))

  return <WatchListContext.Provider value={store}>{children}</WatchListContext.Provider>
}
