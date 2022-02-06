import React, { Suspense } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import PortfolioAssetsList from "./Components/PortfolioAssetsList/PortfolioAssetsList";

const Portfolio = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Suspense
        fallback={<Text style={{ color: "#fff" }}>Loading Please Wait</Text>}
      >
        <PortfolioAssetsList />
      </Suspense>
    </SafeAreaView>
  );
};

export default Portfolio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingTop: Platform.OS === "ios" ? 0 : 50,
  },
});
