import { Pressable, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import SearchableDropdown from "react-native-searchable-dropdown";
import styles from "./styles";
import { useRecoilState } from "recoil";
import { allPortfolioBoughtAssetsInStorage } from "../../Atom/PortfolioAssets";
import { getAllCoins, getDetailCoinData } from "../../services/request";
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useNavigation} from '@react-navigation/native'
import uuid from 'react-native-uuid';

const AddNewAssets = () => {
  const [allCoins, setAllCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectCoinId, setSelectCoinId] = useState(null);
  const [selectCoin, setSelectCoin] = useState(null);
  const [boughtAsseptQuantity, setBoughtAsseptQuantity] = useState("");
  const [assetsInStorage, setAssetsInStorage] = useRecoilState(
    allPortfolioBoughtAssetsInStorage
  );
  const navigation = useNavigation()
  const onAddNewAsset = async () => {
    const newAsset = {
      id:selectCoin?.id,
      uniqe_id:selectCoin.id + uuid.v4(),
      name:selectCoin?.name,
      image:selectCoin?.image.small,
      ticker:selectCoin?.symbol.toUpperCase(),
      boughtQuantity:parseFloat(boughtAsseptQuantity),
      priceBought:selectCoin?.market_data.current_price.usd
    }
    const newAssets =[...assetsInStorage,newAsset]
    const jsonValue = JSON.stringify(newAssets)
    await AsyncStorage.setItem('@portfolio_coins',jsonValue)
    setAssetsInStorage(newAssets)
    navigation.goBack()
  };

  const isQuantityEntred = () => boughtAsseptQuantity === "";

  const fetchAllCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const allCoins = await getAllCoins();
    setAllCoins(allCoins);
    setLoading(false);
  };

  const fetchCoinInfo = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinInfo = await getDetailCoinData(selectCoinId);
    setSelectCoin(coinInfo);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllCoins();
  }, []);

  useEffect(() => {
    if (selectCoinId) {
      fetchCoinInfo();
    }
  }, [selectCoinId]);


  return (
    <View style={{ flex: 1 }}>
      <SearchableDropdown
        items={allCoins}
        onItemSelect={(item) => setSelectCoinId(item.id)}
        containerStyle={styles.container}
        itemStyle={styles.item}
        itemTextStyle={{ color: "white" }}
        resetValue={false}
        placeholder={selectCoinId || "Select a coin ..."}
        placeholderTextColor={"white"}
        textInputProps={{
          underlineColorAndroid: "transparent",
          style: {
            padding: 12,
            borderWidth: 1.5,
            borderColor: "#444444",
            borderRadius: 5,
            color: "white",
            backgroundColor: "#1e1e1e",
          },
        }}
      />
      {selectCoinId && (
        <>
          <View style={styles.boughtQuantityContainer}>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={{ color: "white", fontSize: 90, height: 110 }}
                value={boughtAsseptQuantity}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#1e1e1e"
                onChangeText={setBoughtAsseptQuantity}
              />
              <Text style={styles.ticker}>{selectCoin?.symbol.toUpperCase()}</Text>
            </View>
            <Text style={styles.pricePerCoin}>${selectCoin?.market_data.current_price.usd} per coin</Text>
          </View>
          <Pressable
            style={{
              ...styles.buttonContainer,
              backgroundColor: isQuantityEntred() ? "#303030" : "#4169E1",
            }}
            onPress={onAddNewAsset}
            disabled={isQuantityEntred()}
          >
            <Text
              style={{
                ...styles.buttonText,
                color: isQuantityEntred() ? "grey" : "white",
              }}
            >
              Add New Assets
            </Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

export default AddNewAssets;
