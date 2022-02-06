import { View, Text, Image } from "react-native";
import React from "react";
import styles from "./styles";
import { AntDesign } from "react-native-vector-icons";

const PortfolioAssetsItem = ({ assetsItem }) => {
  const {
    boughtQuantity,
    currentPrice,
    image,
    name,
    priceChangePercentage,
    ticker,
  } = assetsItem;

  
  const isChangePositive = () => priceChangePercentage >= 0;
  const renderHolding = () => (currentPrice * boughtQuantity).toFixed(2);
  return (
    <View style={styles.coinContainer}>
      <Image
        source={{ uri: image }}
        style={{ height: 30, width: 30, marginRight: 10, alignSelf: "center" }}
      />
      <View>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.ticker}>{ticker}</Text>
      </View>
      <View style={{ marginLeft: "auto" }}>
        <Text style={styles.title}>{currentPrice}</Text>
        <View style={{ flexDirection: "row" }}>
          <AntDesign
            name={isChangePositive() ? "caretup" : "caretdown"}
            size={12}
            color={isChangePositive() ? "#16c784" : "#ea3943"}
            style={{ alignSelf: "center", marginRight: 5 }}
          />
          <Text
            style={{
              color: isChangePositive() ? "#16c784" : "#ea3943",
              fontWeight: "600",
            }}
          >
            {priceChangePercentage?.toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <Text style={styles.title}>{renderHolding()}</Text>
        <Text style={styles.ticker}>
          {boughtQuantity} {ticker}
        </Text>
      </View>
    </View>
  );
};

export default PortfolioAssetsItem;
