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



// Styles for the PDF
export const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    padding: 20,
    fontFamily: "Roboto",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 15,
    borderRadius: 5,
    position: "relative",
    height: "100%", // Ensure it fills the page
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 2,
    color: "#000", // Matching your UI color
  },
  subtitle: {
    fontSize: 11, 
    textAlign: "center", 
    opacity: 0.8,
    marginBottom: 2,
  },
    cardTitle: {
    textAlign: "center",
    fontSize: "14px",
    fontWeight: 600,
    marginTop: "2px",
    opacity:0.9
  },
cardName: {
  width: 150, 
  margin: "auto",
  backgroundColor: "#052e16",
  color: "#fff",
  padding: "6px 10px",
  borderRadius: 50,
  textAlign: "center",
  fontSize: "15px",
  fontWeight: 600,
  marginTop: "2px",
},
  divider: {
    borderBottom: "1px solid #c4c4c4",
    marginVertical: 10,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  infoLeft: {
    width: "60%",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    border: "1px solid #c4c4c4",
    borderRadius: "5px",
    padding: "10px",
  },
  infoRight: {
    width: "38%",
    border: "1px solid #c4c4c4",
    borderRadius: "5px",
    padding: "5px",
    alignItems: "center", // Center content if image is added later
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "flex-start", // Align left for consistency
    marginBottom: 5,
  },
  infoLabel: {
    flex: 3,
    fontSize: 11,
    fontWeight: 600,
    width: 80, // Fixed width for labels to align values
  },
  infoValue: {
    flex: 8,
    fontSize: 11,
    fontWeight: 400,
  },

  table: {
    width: "100%",
    marginTop: 8,
    border: "1px solid #000",
    borderBottom: "none",
    borderRadius: "5px",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#bfbfbf",
    fontSize: 11,
    fontWeight: "bold",
    padding: 5,
  },
  tableRow: {
    flexDirection: "row",
    fontSize: 11,
  },
  tableCell: {
    border: "1px solid #000",
    padding: 3,
    flex: 1,
    textAlign: "center", 
  },
  tableCellSubject: {
    border: "1px solid #000",
    flex: 1, // Wider column for Subject Name
    padding: 5,
    textAlign: "left", // Left-align for readability
  },
  tableCellOther: {
    flex: 1, // Narrower columns for Marks, GPA, Letter Grade
    padding: 5,
    textAlign: "center",
  },
  footer: {
    position: "absolute", // Fixed at bottom
    bottom: 20,
    left: 10,
    right: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "1px solid #c0c0c0",
    paddingBottom: 5,
  },
  signature: {
    fontSize: 11,
    fontWeight: "bold",
    borderTop: "1px solid #000",
    paddingTop: 5,
  },
});