// style.js
import {Font, StyleSheet } from "@react-pdf/renderer";
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
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 2,
    color: "#052e16", // Consistent with your branding
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 600,
    textAlign: "center",
    marginBottom: 2,
    opacity: 0.9,
  },
  tableContainer: {
    position: "relative",
  },
  bgLogo: {
    position: "absolute",
    top: "50%",
    left: "30%",
    transform: "translate(-50%, -50%)",
    width: 350,
    height: 350,
    opacity: 0.07,
    zIndex: 0,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#6b7280",
    color: "#fff",
    fontWeight: "bold",
    borderBottom: "1px solid #000",
    zIndex: 1,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #ccc",
    zIndex: 1,
  },
  nameCell :{
    textAlign: "left",
    paddingTop:3,
  },
  cell: {
    padding: 5,
    flexGrow: 1,
    textAlign: "center",
  },
  headerCell: {
    padding: 5,
    flexGrow: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
});
