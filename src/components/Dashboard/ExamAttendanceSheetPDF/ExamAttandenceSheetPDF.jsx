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

export default function ExamAttendancePDF({ studentData, subjects, examName }) {
  
  return (
    <PDFViewer width="100%" height="600px">
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.container}>
            {/* Watermark */}
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
                src="/logo.png"
                style={{ width: 50, position: "absolute", left: 20 }}
              />
              <Text style={styles.title}>
                Shah Neyamat (RH:) KG & High School
              </Text>
              <Text style={styles.subtitle}>
                Karnaphuli, Chattogram || ESTD: 2004
              </Text>

              <Text style={styles.cardTitle}>
                {examName} Exam: {studentData.session}
              </Text>
              <Text style={styles.cardName}>Exam Attendance Sheet</Text>
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
                    {studentData.studentName}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Father's Name:</Text>
                  <Text style={styles.infoValue}>{studentData.fatherName}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Date of Birth:</Text>
                  <Text style={styles.infoValue}>
                    {studentData.dateOfBirth &&
                      format(new Date(studentData.dateOfBirth), "dd-MM-yyyy")}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Class:</Text>
                  <Text style={styles.infoValue}>{studentData.className}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Roll:</Text>
                  <Text style={styles.infoValue}>{studentData.classRoll}</Text>
                </View>
              </View>

              <View style={styles.infoRight}>
               
                  <Image
                    src={studentData?.image || "https://i.ibb.co.com/V0jk4tCT/images.png"}
                    style={{
                      width: "70px",
                      height: "85px",
                      margin: "5px auto",
                      border: "1px solid #5c5e5d",
                      borderRadius: "5px",
                      marginBottom: "10px",
                    }}
                  />
                
                <View style={{ flexDirection: "row", gap: 2 }}>
                  <Text style={{ fontSize: 11 }}>Student ID:</Text>
                  <Text style={{ fontSize: 11, fontWeight: "bold" }}>
                    {studentData?.studentID}
                  </Text>
                </View>
              </View>
            </View>

            {/* Attendance Table */}
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableCellOther, styles.tableHeaderDate]}>
                  Exam Date
                </Text>
                <Text
                  style={[styles.tableCellOther, styles.tableHeaderSubject]}
                >
                  Subject Name
                </Text>
                <Text style={[styles.tableCellOther, styles.tableHeaderCode]}>
                  Subject Code
                </Text>
                <Text style={[styles.tableCellOther, styles.tableHeaderSign]}>
                  Examinee Sign
                </Text>
                <Text style={[styles.tableCellOther, styles.tableHeaderSign]}>
                  Examiner Sign
                </Text>
              </View>

              {subjects.slice(0, 13).map((subject, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}></Text>
                  <Text style={styles.tableCellSubject}>
                    {subject.subjectName}
                  </Text>
                  <Text style={styles.tableCellCode}>
                    {subject.subjectCode}
                  </Text>
                  <Text style={styles.tableCell}></Text>
                  <Text style={styles.tableCell}></Text>
                </View>
              ))}
            </View>

            {/* Footer Signatures */}
            <View style={styles.footer}>
              <Text style={styles.signature}>Exam Controller</Text>
              <Text style={styles.signature}>Head Teacher</Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
