import { Font, StyleSheet } from "@react-pdf/renderer";
Font.register({
  family: "Roboto",
  fonts: [
    { src: "/Fonts/Roboto-Regular.ttf" }, // Regular (400)
    { src: "/Fonts/Roboto-Bold.ttf", fontWeight: "bold" }, // Bold (700)
    { src: "/Fonts/Roboto-SemiBold.ttf", fontWeight: 600 }, // SemiBold (600)
    { src: "/Fonts/Roboto-Light.ttf", fontWeight: 300 }, // Light (300)
    { src: "/Fonts/Roboto-Medium.ttf", fontWeight: 500 }, // Medium (500)
  ],
});
export const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "Roboto",
    position: "relative",
  },
  tableContainer: {
    position: "relative",
    zIndex: 1,
  },
  bgLogo: {
    position: "absolute",
    top: "30%",
    left: "25%",
    width: 400,
    height: 400,
    opacity: 0.08,
    zIndex: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 12,
    marginTop: 4,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: 500,
    opacity: 0.7,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "##000000",
    backgroundColor: "#e6f4ea",
    paddingVertical: 4,
    marginTop: 10,
  },
  headerCell: {
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: "##000000",
    paddingVertical: 3,
  },
  cell: {
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: "#000000",
    textAlign: "left",
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  nameCell: {
    textAlign: "left",
    paddingLeft: 3,
  },
  footer: {
    width: "95%",
    margin: "0 auto",
    padding: "20px",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: -300,
    left: 10,
    borderBottom: "1px solid #757575",
  },
  signature: {
    fontSize: 12,
    fontWeight: 500,
    borderTop: "1px solid #000",
    paddingTop: 5,
  },
});
