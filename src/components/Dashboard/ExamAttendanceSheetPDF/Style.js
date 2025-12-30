import { Font, StyleSheet } from "@react-pdf/renderer";

// Register Roboto font family with different weights
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

// Styles for the Exam Attendance Sheet
export const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    padding: 20,
    fontFamily: "Roboto",
  },
  container: {
    flexDirection: "column",
    padding: 15,
    borderRadius: 5,
    position: "relative",
    height: "100%",
  },

  // Header
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 2,
    color: "#000",
  },
  subtitle: {
    fontSize: 11,
    textAlign: "center",
    opacity: 0.8,
    marginBottom: 2,
  },
  cardTitle: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: 600,
    marginTop: 2,
    opacity: 0.9,
  },
  cardName: {
    width: 300,
    margin: "auto",
    backgroundColor: "#052e16",
    color: "#fff",
    padding: "6px 10px",
    borderRadius: 50,
    textAlign: "center",
    fontSize: 15,
    fontWeight: 600,
    marginTop: 4,
  },
  divider: {
    borderBottom: "1px solid #c4c4c4",
    marginVertical: 10,
  },

  // Student Info
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  infoLeft: {
    width: "60%",
    flexDirection: "column",
    gap: 6,
    border: "1px solid #c4c4c4",
    borderRadius: 5,
    padding: 10,
  },
  infoRight: {
    width: "38%",
    border: "1px solid #c4c4c4",
    borderRadius: 5,
    padding: 5,
    alignItems: "center",
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  infoLabel: {
    flex: 3,
    fontSize: 11,
    fontWeight: 600,
  },
  infoValue: {
    flex: 8,
    fontSize: 11,
    fontWeight: 400,
  },

  // table

  table: {
    width: "100%",
    marginTop: 8,
    border: "1px solid #000",
    borderBottom: "none",
    borderRadius: "5px",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#cdf7df", // Dark green
    fontSize: 11,
    fontWeight: "bold",
    padding: 4,
    color: "#fff", // White text for contrast
  },
  tableRow: {
    flexDirection: "row",
    fontSize: 11,
  },
  tableCell: {
    border: "1px solid #000",
    padding: 4,
    flex: 1,
    textAlign: "center",
  },
  tableCellOther: {
    padding: 4,
    flex: 1,
    textAlign: "center",
    backgroundColor: "#cdf7df", // Dark green background
    color: "#000", // White text
  },
  tableCellSubject: {
    border: "1px solid #000",
    flex: 2,
    padding: 4,
    textAlign: "left",
  },
  tableCellCode: {
    border: "1px solid #000",
    flex: 1,
    padding: 4,
    textAlign: "center",
  },
  tableHeaderDate: {
  flex: 1,
},
tableHeaderSubject: {
  flex: 2,
},
tableHeaderCode: {
  flex: 1,
},
tableHeaderSign: {
  flex: 1,
},
 

  // Footer (Signatures)
  footer: {
    position: "absolute",
    bottom: 25,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
  },
  signature: {
    fontSize: 11,
    fontWeight: "bold",
    borderTop: "1px solid #000",
    paddingTop: 5,
    width: 120,
    textAlign: "center",
  },
});
