import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Platform,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./styles";
import ContainerDetailHeader from "./components/CoinDetailHeader/CoinDetailHeader";
import IconAnt from "react-native-vector-icons/AntDesign";
import { LineChart } from "react-native-chart-kit";
import { useRoute } from "@react-navigation/native";
import { getDetailCoinData, getMarketChart } from "../../services/request";
import FilterComponent from "./components/FilterComponent/FilterComponent";

const CoinDetail = () => {
  const [coin, setCoin] = useState(null);
  const [coinMarketData, setCoinMarketData] = useState(null);
  const route = useRoute();
  const {
    params: { coinId },
  } = route;

  const [loading, setLoading] = useState(false);
  const [coinValue, setCoinValue] = useState("1");
  const [usdValue, setUsdValue] = useState("");
  const [selectedRange, setSelectedRange] = useState("1");

  const onSelectedRangeChange = (selectedRangeValue) => {
    setSelectedRange(selectedRangeValue);
    fetchCoinMarketData(selectedRangeValue)
  };

  const fetchCoinData = async () => {
    setLoading(true);
    const fetchCoinData = await getDetailCoinData(coinId);
    setCoin(fetchCoinData);
    setUsdValue(fetchCoinData.market_data.current_price.usd.toString());
    setLoading(false);
  };

  const fetchCoinMarketData = async (selectedRangeValue) =>{
    const fetchMarketData = await getMarketChart(coinId,selectedRangeValue);
    setCoinMarketData(fetchMarketData);
  }

  useEffect(() => {
    fetchCoinData();
    fetchCoinMarketData(1)
  }, []);

  if (loading || !coin || !coinMarketData) {
    return (
      <ActivityIndicator size={"large"} color={"#eee"} style={{ flex: 1 }} />
    );
  }

  const {
    id,
    image: { small },
    market_data: {
      current_price,
      market_cap_rank,
      price_change_percentage_24h,
    },
    symbol,
    name,
  } = coin;

  const { prices } = coinMarketData;

  const chartConfig = {
    backgroundColor: "#FFF",
    backgroundGradientFrom: "#ff9900",
    backgroundGradientTo: "#282828",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };
  const screenWidth = Dimensions.get("window").width;
  const data = {
    datasets: [
      {
        data: prices.map((price) => price[1]),
      },
    ],
  };
  const percentageColor =
    price_change_percentage_24h < 0 ? "#ea3943" : "#16c784";

  const changeCoinValue = (value) => {
    setCoinValue(value);
    setUsdValue((Number(value) * current_price.usd).toString());
  };

  const changeUsdValue = (value) => {
    setUsdValue(value);
    setCoinValue((Number(value) / current_price.usd).toString());
  };

  const filterDaysArray = [
    { filterDay: "1", filterText: "24h" },
    { filterDay: "7", filterText: "7d" },
    { filterDay: "30", filterText: "30d" },
    { filterDay: "365", filterText: "1y" },
    { filterDay: "max", filterText: "All" },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { paddingTop: Platform.OS === "ios" ? 0 : 50 }]}
    >
      <ContainerDetailHeader
        coinId={id}
        image={small}
        market_data={market_cap_rank}
        symbol={symbol}
      />
      <View style={styles.priceContainer}>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.currentPrice}>${current_price.usd}</Text>
        </View>
        <View
          style={{
            backgroundColor: percentageColor,
            paddingHorizontal: 3,
            paddingVertical: 8,
            borderRadius: 5,
            flexDirection: "row",
          }}
        >
          <IconAnt
            name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"}
            size={12}
            color={"white"}
            style={{ alignSelf: "center", marginRight: 5 }}
          />
          <Text style={styles.priceChange}>
            {price_change_percentage_24h.toFixed(2)}%
          </Text>
        </View>
      </View>
      <View style={styles.filtersContainer}>
        {filterDaysArray.map((filter,index)=>(
        <View key={index}>
            <FilterComponent
            filterDay={filter.filterDay}
            filterText={filter.filterText}
            selectedRange={selectedRange}
            setSelectedRange={onSelectedRangeChange}
          />
        </View>
        ))}
      </View>
      <LineChart
        data={data}
        width={screenWidth}
        height={screenWidth / 2}
        chartConfig={chartConfig}
        bezier
        withDots={false}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <View style={{ flexDirection: "row", padding: 10 }}>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Text style={{ color: "#fff", alignSelf: "center" }}>
            {symbol.toUpperCase()}
          </Text>
          <TextInput
            style={styles.input}
            value={coinValue}
            keyboardType="numeric"
            onChangeText={changeCoinValue}
          />
        </View>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Text style={{ color: "#fff", alignSelf: "center" }}>USD</Text>
          <TextInput
            style={styles.input}
            value={usdValue}
            keyboardType="numeric"
            onChangeText={changeUsdValue}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CoinDetail;
