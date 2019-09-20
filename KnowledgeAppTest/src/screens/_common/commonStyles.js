import { StyleSheet } from "react-native";

const commonStyles = StyleSheet.create({
  errorTextStyle: {
    alignSelf: "center",
    fontSize: 18,
    color: "red",
    marginBottom: 5,
    fontFamily: "Segoe UI"
  },
  commonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Segoe UI"
  },
  smallText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Segoe UI"
  },
  commonWideButton: {
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10
  },
  menuText: {
    color: "#FFFFFF",
    fontFamily: "Segoe UI",
    fontSize: 20
  },
  menuIcon: {
    color: "#FFFFFF"
  },
  complexListElementContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  webChatBubleMineFooter: {
    flex: 1,
    backgroundColor: "#5067ff",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 0
  },
  webChatBubleOtherFooter: {
    flex: 1,
    backgroundColor: "#1a1d2e",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 0
  },
  webChatBubleFooterString: {
    color: "white",
    marginLeft: 10,
    marginRight: 10,
    fontFamily: "Segoe UI",
    fontSize: 12
  }
});

export default commonStyles;
