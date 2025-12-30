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
    backgroundColor: "#fff",
    padding: "5%",
    fontFamily: "Roboto",
    flexDirection: "column",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 15,
    borderRadius: 5,
    position: "relative",
    flex: 1,
  },
  overlayLogo: {
    position: "absolute",
    top: "35%",
    left: "28%",
    transform: "translate(-50%, -50%)",
    width: 380,
    height: 380,
    opacity: 0.17,
  },
  headerLogo: {
    height: 50,
    width: 50,
    position: "absolute",
    left: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 2,
    color: "#052e16",
  },
  subtitleSmall: {
    fontSize: 11,
    fontWeight: 500,
    textAlign: "center",
    opacity: 0.8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 600,
    textAlign: "center",
    marginTop: 3,
    marginBottom: 2,
    opacity: 0.9,
  },
  divider: {
    borderBottom: "1px solid #c4c4c4",
    marginVertical: 10,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    flexWrap: "wrap",
  },
  infoLeft: {
    width: "60%",
    minWidth: 200,
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    border: "1px solid #c4c4c4",
    borderRadius: "5px",
    padding: "10px",
  },
  infoRowText: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 5,
  },
  infoLabelInline: {
    fontSize: 11,
    fontWeight: 600,
  },
  infoValueInline: {
    fontSize: 12,
    fontWeight: "bold",
  },
  infoValueText: {
    fontSize: 11,
  },
  infoRight: {
    width: "38%",
    minWidth: 150,
    border: "1px solid #c4c4c4",
    borderRadius: "5px",
    padding: "5px",
    alignItems: "center",
  },
  studentImage: {
    width: 50,
    height: 60,
    margin: "5px auto",
    border: "1px solid #5c5e5d",
    borderRadius: 5,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 5,
    width: "100%",
  },
  infoLabel: {
    flex: 2,
    fontSize: 11,
    fontWeight: 600,
    minWidth: 70,
  },
  infoValue: {
    flex: 3,
    fontSize: 11,
    fontWeight: 400,
  },
  table: {
    width: "100%",
    marginTop: 8,
    border: "1px solid #a6a4a4",
    borderBottom: "none",
    borderRadius: "5px",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#bfbfbf",
    fontSize: 11,
    fontWeight: "bold",
    borderBottom: "1px solid #a19f9f",
    padding: 5,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #a19f9f",
    fontSize: 11,
  },
  tableCellSubject: {
    flex: 2,
    padding: 5,
    textAlign: "left",
  },
  tableCellOther: {
    flex: 1,
    padding: 5,
    textAlign: "center",
  },
  footer: {
    width: "95%",
    margin: "0 auto",
    padding: "20px",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 30,
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