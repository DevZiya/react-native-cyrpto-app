import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  currentBalance: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  currentBalanceValue: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "700",
    letterSpacing: 1,
  },
  valueChange: {
    fontSize: 16,
    fontWeight: "600",
  },
  presentChange: {
    fontSize: 17,
    color: "#fff",
    fontWeight: "500",
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 10,
  },
  pricePresentChangeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#16c784",
    paddingHorizontal: 3,
    paddingVertical: 8,
    borderRadius: 5,
  },
  assetsLabel: {
    fontSize: 23,
    color: "#fff",
    fontWeight: "700",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: "#4169E1",
    padding:10,
    alignItems:"center",
    marginHorizontal:10,
    marginVertical:25,
    borderRadius:5
  },
  buttonText: {
    fontSize: 17,
    color: "#fff",
    fontWeight: "600",
  },
});

export default styles;
