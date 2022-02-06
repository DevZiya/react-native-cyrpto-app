import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  FlatList,
  RefreshControl,
} from "react-native";
import { useWatchList } from "../../Contexts/WatchListContext";
import CoinItem from "../../components/CoinItem";
import { getWatchlistedCoins } from "../../services/request";

const WatchList = () => {
  const { watchlistCoinIds } = useWatchList();

  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(false);

  const transfromCoinId = () => watchlistCoinIds.join("%2C");

  const fetchWatchlistedCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const watchlistCoinData =
      (await getWatchlistedCoins(1, transfromCoinId())) || [];
    setCoin(watchlistCoinData);
    setLoading(false);
  };

  useEffect(() => {
    if (watchlistCoinIds.length > 0) {
      fetchWatchlistedCoins();
    }
  }, [watchlistCoinIds]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={coin}
        keyExtractor={(item, index) => index}
        renderItem={(item) => <CoinItem marketCoin={item} />}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            tintColor="white"
            onRefresh={fetchWatchlistedCoins}
          />
        }
      />
    </SafeAreaView>
  );
};

export default WatchList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    flexDirection: "row",
    paddingTop: Platform.OS === "ios" ? 0 : 50,
  },
});
