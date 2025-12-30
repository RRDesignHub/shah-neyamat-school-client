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
export const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    padding: 30,
    fontFamily: "Roboto",
  },
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    border: "1px dashed #fafafa",
    gap: 20,
    paddingBottom: 40,
  },
  
  title: {
    fontSize: 18,
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
    fontSize: 12,
    fontWeight: 600,
    marginTop: 2,
    opacity: 0.9,
  },
  cardName: {
    width: 110,
    margin: "auto",
    backgroundColor: "#052e16",
    color: "#fff",
    padding: "6px 10px",
    borderRadius: 50,
    textAlign: "center",
    fontSize: 13,
    fontWeight: 600,
    marginTop: 4,
    marginBottom: 2,
  },
  
   // Student Info
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 1,
  },
  infoLeft: {
    width: "60%",
    flexDirection: "column",
    gap: 6,
    border: "1px solid #c4c4c4",
    borderRadius: 5,
    padding: 5,
  },
  infoRight: {
    width: "38%",
    border: "1px solid #c4c4c4",
    borderRadius: 5,
    padding: 3,
    alignItems: "center",
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 1,
  },
  infoLabel: {
    flex: 3,
    fontSize: 10,
    fontWeight: 600,
  },
  infoValue: {
    flex: 8,
    fontSize: 11,
    fontWeight: 400,
  },

  
  // Footer (Signatures)
  footer: {
    marginTop: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
  },
  signatures: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  signatureLine: {
    fontSize: 10,
    borderTop: "1px solid #000",
    textAlign: "center",
    width: "35%",
    paddingTop: 2,
  },
});
