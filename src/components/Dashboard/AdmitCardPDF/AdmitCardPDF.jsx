import {
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  Image,
} from "@react-pdf/renderer";
import { styles } from "./Style";
import { format } from "date-fns";
export default function AdmitCardPDF({ admitCardData }) {
  console.log(admitCardData)
  return (
    <PDFViewer width="100%" height="600px">
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.container}>
            <Image
              src="/logo.png"
              style={{
                position: "absolute",
                top: "40%",
                left: "25%",
                transform: "translate(-50%, -50%)",
                width: 380,
                opacity: 0.17,
              }}
            />
            {/* Header */}
            <View>
              <Image
                src="/logo.png" // Adjust path based on your public folder setup
                style={{
                  width: 50,
                  position: "absolute",
                  left: 20,
                }}
              />
              <Text style={styles.title}>
                Shah Neyamat (RH:) KG & High School
              </Text>
              <Text style={styles.subtitle}>
                Karnaphuli, Chattogram || ESTD: 2004
              </Text>

              <Text style={styles.cardTitle}>
                {admitCardData.examName &&
                admitCardData.examName === "1st-Semester"
                  ? "1st Semester"
                  : admitCardData.examName === "2nd-Semester"
                  ? "2nd Semester"
                  : admitCardData.examName === "3rd-Semester"
                  ? "3rd Semester"
                  : admitCardData.examName === "Half-Yearly"
                  ? "Half Yearly"
                  : admitCardData.examName === "Annual"
                  ? "Annual"
                  : admitCardData.examName === "2nd-Modeltest"
                  ? "2nd Model Test"
                  : admitCardData.examName === "Pre-Test"
                  ? "Pre-Test"
                  : admitCardData.examName === "1st-Modeltest"
                  ? "1st Model Test"
                  : admitCardData.examName === "SSC-Test"
                  ? "SSC-Test" : admitCardData.examName === ""}{" "}
                Exam: {admitCardData.session}
              </Text>
              <Text style={styles.cardName}>Admit Card</Text>
            </View>
            <View style={styles.divider} />

            {/* Student Info */}
            <View style={styles.infoContainer}>
              <View style={styles.infoLeft}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Student Name:</Text>
                  <Text
                    style={{ flex: 8, fontSize: "13px", fontWeight: "bold" }}
                  >
                    {admitCardData.studentName}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Father's Name:</Text>
                  <Text style={styles.infoValue}>
                    {admitCardData.fatherName}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Date of Birth:</Text>
                  <Text style={styles.infoValue}>
                    {/* {new Date(admitCardData.dateOfBirth).toLocaleDateString()} */}
                    {admitCardData.dateOfBirth &&
                      format(new Date(admitCardData.dateOfBirth), "dd-MM-yyyy")}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Class Roll:</Text>
                  <Text style={styles.infoValue}>
                    {admitCardData.classRoll}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Exam Center:</Text>
                  <Text style={styles.infoValue}>
                    Charlakshya Union High School
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Reg. No:</Text>
                  <Text style={styles.infoValue}></Text>
                </View>
              </View>
              <View style={styles.infoRight}>
                {admitCardData?.image && (
                  <Image
                    src={admitCardData?.image}
                    style={{
                      width: "70px",
                      height: "85px",
                      margin: "5px auto",
                      border: "1px solid #5c5e5d",
                      borderRadius: "5px",
                      marginBottom: "10px",
                    }}
                  ></Image>
                )}

                <View
                  style={{ display: "flex", flexDirection: "row", gap: "2px" }}
                >
                  <Text style={{ fontSize: "11px" }}>Student ID:</Text>
                  <Text style={{ fontSize: "11px", fontWeight: "bold" }}>
                    {admitCardData?.studentID}
                  </Text>
                </View>
                <View
                  style={{ display: "flex", flexDirection: "row", gap: "2px" }}
                >
                  <Text style={{ fontSize: "11px" }}>Session:</Text>
                  <Text style={{ fontSize: "11px", fontWeight: "bold" }}>
                    2024-25 (Exam: 2026)
                  </Text>
                </View>
              </View>
            </View>

            {/* Exam Schedule Table */}
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableCellOther}>Subject Name</Text>
                <Text style={styles.tableCellOther}>Exam Date</Text>
                <Text style={styles.tableCellOther}>Time</Text>
              </View>
              {admitCardData.examData.map((subject, index) => {
                const baseDate = new Date(subject.examDate);
                const [fromHours, fromMinutes] = subject.examFrom.split(":");
                const [toHours, toMinutes] = subject.examTo.split(":");
                const fromDate = new Date(baseDate);
                fromDate.setHours(parseInt(fromHours), parseInt(fromMinutes));
                const toDate = new Date(baseDate);
                toDate.setHours(parseInt(toHours), parseInt(toMinutes));
                return (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableCellSubject}>
                      {subject.subjectName}
                    </Text>
                    <Text style={styles.tableCell}>
                      {subject.examDate &&
                        format(new Date(subject.examDate), "dd-MM-yyyy, EEEE")}
                    </Text>
                    <Text style={styles.tableCell}>
                      {fromDate && toDate
                        ? `${format(fromDate, "hh:mm a")} - ${format(
                            toDate,
                            "hh:mm a"
                          )}`
                        : "N/A"}
                    </Text>
                  </View>
                );
              })}
            </View>
            {/* Footer with Signatures */}
            <View style={styles.footer}>
              <Text style={styles.signature}>Head Teacher</Text>
              <Text style={styles.signature}>Exam Controller</Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
