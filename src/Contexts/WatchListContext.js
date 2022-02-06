import React,{useContext,createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WatchListContext = createContext()

export const useWatchList = () => useContext(WatchListContext)

const WatchListProvider = ({children}) => {
    const [watchlistCoinIds,setWatchlistCoinIds] = useState([])

    const getWatchlistData = async () =>{
      try {
          const jsonValue = await AsyncStorage.getItem("@watchlist_coins")
          setWatchlistCoinIds(jsonValue != null ? JSON.parse(jsonValue) : [])
      } catch (error) {
          console.log(error);
      }
    }

    useEffect(()=>{
      getWatchlistData()
    },[])

    const storeWatchListCoin = async (coinId) =>{
      try {
          const newWatchList = [...watchlistCoinIds,coinId]
          const jsonValue = JSON.stringify(newWatchList)
          await AsyncStorage.setItem("@watchlist_coins",jsonValue)
          setWatchlistCoinIds(newWatchList)
      } catch (error) {
          console.log(error);
      }
    }

    const removeWatchListCoin = async (coinId) =>{
        const newWatchList = watchlistCoinIds.filter(watchId=>watchId !== coinId)
        const jsonValue = JSON.stringify(newWatchList)
        await AsyncStorage.setItem("@watchlist_coins",jsonValue)
        setWatchlistCoinIds(newWatchList)
    }
  return (
    <WatchListContext.Provider value={{watchlistCoinIds,storeWatchListCoin,removeWatchListCoin}} >
        {children}
    </WatchListContext.Provider>
  );
};

export default WatchListProvider;
