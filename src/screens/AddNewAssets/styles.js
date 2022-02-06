import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  item: {
    padding: 10,
    marginTop: 2,
    backgroundColor: "#1e1e1e",
    borderWidth: 1,
    borderColor: "#444444",
    borderRadius: 5,
  },
  ticker: {
    color: "grey",
    fontSize: 20,
    marginTop: 25,
    marginLeft: 5,
    fontWeight: "700",
  },
  boughtQuantityContainer: {
    alignItems: "center",
    marginTop: 50,
    flex:1
  },
  buttonContainer: {
    padding: 10,
    alignItems: "center",
    marginHorizontal: 30,
    marginVertical: 30,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "600",
  },
  pricePerCoin:{
      color:'grey',
      fontWeight:'600',
      fontSize:17,
      letterSpacing:0.5
  }
});

export default styles;
