import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Platform,
  RefreshControl,
  Text,
} from "react-native";
import React, { useState, useEffect} from "react";
import CoinItem from "../../components/CoinItem/index";
import { getMarketData } from "../../services/request";

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoins = async (pageNumber) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getMarketData(pageNumber)
    setCoins((existingCoins) => ([...existingCoins, ...coinsData]))
    setLoading(false);
  }

  const refetchCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getMarketData()
    setCoins(coinsData)
    setLoading(false);
  }

  useEffect(() => {
    fetchCoins()
  }, [])

  return (
   <SafeAreaView style={styles.container}>
     <Text style={{fontFamily:'DoridSans',color:'white',fontSize:25,letterSpacing:1,paddingHorizontal:20,paddingBottom:5}}>Cyrptoassets</Text>
      <FlatList
      data={coins}
      keyExtractor={(item,index)=>index}
      renderItem={(item ) => <CoinItem marketCoin={item} />}
      onEndReached={() => fetchCoins((coins.length / 50) + 1)}
      maxToRenderPerBatch={50}
      refreshControl={
        <RefreshControl 
          refreshing={loading}
          tintColor="white"
          onRefresh={refetchCoins}
        />
      }
    />
   </SafeAreaView>
  )
    }
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: Platform.OS === "ios" ? 0 : 50,
  },
});
