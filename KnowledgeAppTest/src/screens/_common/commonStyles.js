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
  },
  cardItemContentRow: {
    backgroundColor: "#1a1d2e",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  cardItemContentRowFlexStart: {
    backgroundColor: "#1a1d2e",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  cardItemContentRowSpaceAround: {
    backgroundColor: "#1a1d2e",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  textRows: {
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  defaultBackground: {
    backgroundColor: "#131726"
  },
  defaultOverlayBackgroundColor: {
    backgroundColor: "#1a1d2e"
  },
  modalPositioning: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  webModalCard: {
    width: "25rem"
  },
  androidModalCard: {
    width: "90%"
  }
});

export default commonStyles;
