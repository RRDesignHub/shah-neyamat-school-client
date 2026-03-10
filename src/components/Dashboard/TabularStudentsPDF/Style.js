import { Font, StyleSheet } from "@react-pdf/renderer";

// Font registration
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
      fontWeight: 400,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: 700,
    },
  ],
});

export const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: "#ffffff",
    fontFamily: "Roboto",
  },

  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 14,
    columnGap: 6,
  },

  // Main Card Styles
  card: {
    width: "32.3%", // exactly 3 per row
    height: 220, // Slightly increased height for new content
    border: "1.2pt solid #166534",
    borderRadius: 4,
    overflow: "hidden",
    flexDirection: "column",
    backgroundColor: "#ffffff",
  },

  header: {
    backgroundColor: "#166534",
    paddingVertical: 4,
    textAlign: "center",
  },

  schoolName: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#ffffff",
    textTransform: "uppercase",
  },

  content: {
    paddingTop: 3,
    paddingLeft: 6,
    paddingRight: 6,
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 6,
  },

  photoSection: {
    marginBottom: 4,
    alignItems: "center",
  },

  image: {
    width: 50,
    height: 56,
    border: "0.8pt solid #16a34a",
    borderRadius: 2,
  },

  idBadge: {
    backgroundColor: "#dcfce7",
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    marginBottom: 3,
  },

  sidText: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#166534",
  },

  nameText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#064e3b",
    marginBottom: 5,
    textAlign: "center",
    width: "100%",
  },

  // Two Column Layout
  twoColumnRow: {
    borderTop: "1px solid #dcfce7",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    paddingVertical: 4,
    width: "100%",
    gap: 4,
    marginTop: 2,
    borderBottom: "1px solid #dcfce7",
  },

  leftColumn: {
    flex: 1,
    flexDirection: "column",
    gap: 1,
  },

  rightColumn: {
    flex: 1,
    flexDirection: "column",
    gap: 1,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    paddingHorizontal: 2,
  },

  label: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#166534",
    width: "35%",
  },

  value: {
    fontSize: 9,
    color: "#334155",
    width: "60%",
    textAlign: "right",
  },
  footerText: {
    marginBottom: 3,
    marginLeft: 5,
    textAlign: "left",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  footerLabel: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#166534",
  },
  footerValue: {
    fontSize: 9,
    color: "#334155",
  },
});
