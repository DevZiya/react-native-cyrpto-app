import { View, Text, Image } from "react-native";
import React from "react";
import { Ionicons, EvilIcons, FontAwesome } from "react-native-vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useWatchList } from "../../../../Contexts/WatchListContext";

const CoinDetailHeader = (props) => {
  const { image, market_data, symbol, coinId } = props;
  const navigation = useNavigation();
  const { watchlistCoinIds, storeWatchListCoin, removeWatchListCoin } =
    useWatchList();
    
  const checkIfCoinIsWatchlisted = () =>
    watchlistCoinIds.some((coinValue) => coinValue === coinId);

  const handleWatchlistCoin = () => {
    if (checkIfCoinIsWatchlisted()) {
      return removeWatchListCoin(coinId);
    }
    return storeWatchListCoin(coinId);
  };

  return (
    <View style={styles.headerContainer}>
      <Ionicons
        name="chevron-back-sharp"
        size={30}
        color="white"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.tickerContainer}>
        <Image source={{ uri: image }} style={{ width: 25, height: 25 }} />
        <Text style={styles.tickerTitle}>{symbol.toUpperCase()}</Text>
        <View style={styles.rankContainer}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
            #{market_data}
          </Text>
        </View>
      </View>
      <FontAwesome
        name={checkIfCoinIsWatchlisted() ? "star" : "star-o"}
        size={25}
        color={checkIfCoinIsWatchlisted() ? "#ffbf00" : "white"}
        onPress={handleWatchlistCoin}
      />
    </View>
  );
};

export default CoinDetailHeader;
