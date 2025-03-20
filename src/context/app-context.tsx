import { createContext, useContext, useState } from 'react';
import { WatchList } from '../store/watch-list-store';

const WatchListContext = createContext<WatchList>(null!);

type Props = {
  children: React.ReactNode;
};

export const WatchListContextProvider = ({ children }: Props) => {
  const [store] = useState(new WatchList([]));

  return (
    <WatchListContext.Provider value={store}>
      {children}
    </WatchListContext.Provider>
  );
};

export const useWatchList = () => useContext(WatchListContext);
