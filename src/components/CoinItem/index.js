import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import IconAnt from "react-native-vector-icons/AntDesign";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const CoinItem = ({ marketCoin }) => {
  const { item } = marketCoin;

  const normalizeMarketCap = (cap) => {
    if (cap > 1e12) {
      return `${(cap / 1e12).toFixed(3)} T`;
    } else if (item > 1e9) {
      return `${(cap / 1e9).toFixed(3)} B`;
    } else if (item > 1e6) {
      return `${(cap / 1e6).toFixed(3)} M`;
    } else if (item > 1e3) {
      return `${(cap / 1e3).toFixed(3)} K`;
    } else {
      return cap;
    }
  };

  const percentageColor =
    item.market_cap_change_percentage_24h < 0 ? "#ea3943" : "#16c784";

    const navigation = useNavigation()
  return (
    <Pressable style={styles.coinContainer}
    onPress={()=>navigation.navigate('CoinDetail',{coinId:item.id})}
    >
      <Image
        source={{
          uri: item.image,
        }}
        style={{ width: 30, height: 30, marginRight: 10, alignSelf: "center" }}
      />
      <View>
        <View>
          <Text style={styles.title}>{item.name}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.rankContainer}>
            <Text style={styles.rank}>{item.market_cap_rank}</Text>
          </View>
          <Text style={styles.text}>{item.symbol.toUpperCase()}</Text>
          <IconAnt
            name={
              item.market_cap_change_percentage_24h < 0
                ? "caretdown"
                : "caretup"
            }
            size={12}
            color={percentageColor}
            style={{ alignSelf: "center", marginRight: 5 }}
          />
          <Text style={{ color: percentageColor }}>
            {item.market_cap_change_percentage_24h.toFixed(2)}%
          </Text>
        </View>
      </View>
      <View style={{ marginLeft: "auto" }}>
        <Text style={styles.text}>{item.current_price.toFixed(2)}</Text>
        <Text style={styles.text}>
          Mcap {normalizeMarketCap(item.market_cap)}
        </Text>
      </View>
    </Pressable>
  );
};

export default CoinItem;
