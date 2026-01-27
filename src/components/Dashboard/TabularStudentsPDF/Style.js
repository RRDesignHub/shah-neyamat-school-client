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
    gap: 6,
  },

  card: {
    width: "32.3%", // exactly 3 per row
    height: 180,
    border: "1.2pt solid #166534",
    borderRadius: 6,
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
    padding: 6,
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1,
  },

  photoSection: {
    marginBottom: 5,
    alignItems: "center",
  },

  image: {
    width: 48,
    height: 55,
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
    fontSize: 7,
    fontWeight: "bold",
    color: "#166534",
  },

  nameText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#064e3b",
    marginBottom: 4,
    textAlign: "center",
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 3,
  },

  label: {
    fontSize: 7,
    fontWeight: "bold",
    color: "#166534",
  },

  textSm: {
    fontSize: 7,
    color: "#334155",
  },

  mobileBox: {
    marginTop: 4,
    backgroundColor: "#f0fdf4",
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 3,
  },

  mobileText: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#166534",
    textAlign: "center",
  },

  footer: {
    borderTop: "0.6pt dashed #94a3b8",
    paddingVertical: 3,
    textAlign: "center",
    fontSize: 6,
    color: "#64748b",
    backgroundColor: "#f8fafc",
  },
});
