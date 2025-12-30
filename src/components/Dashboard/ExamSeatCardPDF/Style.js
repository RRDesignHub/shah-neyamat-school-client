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
    padding: 20,
    fontSize: 10,
    fontFamily: "Roboto",
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "25%", // 👉 2 per row
    minHeight: 150,
    border: "1pt solid #000",
    borderRadius: 4,
    padding: 6,
    marginBottom: 2,
    textAlign: "center",
  },
  schoolName: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 2,
  },
  divider: {
    borderBottom: "1px solid #c4c4c4",
    marginVertical: 1,
  },
  examName: {
    fontSize: 8,
    marginBottom: 3,
  },
  studentImage: {
    width: 50,
    height: 50,
    margin: "0 auto",
    border: "1pt solid #000",
    marginBottom: 5,
  },
  info: {
    marginTop: 3,
  },
  infoText: {
    display: "flex",
    columnGap: 10,
    fontSize: 9,
    marginVertical: 2,
  },
  label: {
    fontWeight: "bold",
  },
  row: {
  flexDirection: "row",
  justifyContent: "center", // or "flex-start"
  alignItems: "center",
  marginTop: 2,
},
});
