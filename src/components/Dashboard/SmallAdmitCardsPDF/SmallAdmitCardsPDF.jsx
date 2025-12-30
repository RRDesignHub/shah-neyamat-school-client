import {
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  Image,
} from "@react-pdf/renderer";
import { styles } from "./Style";

export default function SmallAdmitCardsPDF({ students, examName, session }) {
  return (
    <PDFViewer width="100%" height="600px">
      <Document>
        {students.map((student, studentIndex) => (
          // Renders one Page per Student, sized A5 (half A4)
          <Page
            key={student._id || studentIndex}
            size="A5"
            orientation="landscape"
            style={styles.page}
          >
            {/* The pageContainer is only holding one card now */}
            <View style={styles.pageContainer}>
              <View key={student._id} style={styles.card}>
                <Image
                  src="/logo.png"
                  style={{
                    position: "absolute",
                    top: "42%",
                    left: "40%",
                    transform: "translate(-50%, -50%)",
                    width: 200,
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
                      left: 30,
                    }}
                  />
                  <Text style={styles.title}>
                    Shah Neyamat (RH:) KG & High School
                  </Text>
                  <Text style={styles.subtitle}>
                    Karnaphuli, Chattogram || ESTD: 2004
                  </Text>
                  <Text style={styles.cardTitle}>
                    {examName} Exam: {session}
                  </Text>
                  <Text style={styles.cardName}>Admit Card</Text>
                </View>

                <View style={styles.infoContainer}>
                  <View style={styles.infoLeft}>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Student Name:</Text>
                      <Text
                        style={{
                          flex: 8,
                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                      >
                        {student.studentName}
                      </Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Father's Name:</Text>
                      <Text
                        style={{
                          flex: 8,
                          fontSize: "11px",
                        }}
                      >
                        {student.fatherName}
                      </Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Mother's Name:</Text>
                      <Text
                        style={{
                          flex: 8,
                          fontSize: "11px",
                        }}
                      >
                        {student.motherName}
                      </Text>
                    </View>

                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Class:</Text>
                      <Text style={styles.infoValue}>{student.className}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Roll:</Text>
                      <Text style={styles.infoValue}>{student.classRoll}</Text>
                    </View>
                  </View>
                  <View style={styles.infoRight}>
                    <Image
                      src={
                        student?.image ||
                        "https://i.ibb.co.com/V0jk4tCT/images.png"
                      }
                      style={{
                        width: "60px",
                        height: "75px",
                        margin: "5px auto",
                        border: "1px solid #5c5e5d",
                        borderRadius: "5px",
                      }}
                    ></Image>
                    <View style={styles.infoRow}>
                      <Text
                        style={{
                          fontSize: "11px",
                        }}
                      >
                        Student ID:
                      </Text>
                      <Text
                        style={{
                          fontSize: "13px",
                          fontWeight: "bold",
                          marginLeft: 3,
                        }}
                      >
                        {student?.studentID}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.footer}>
                  <Text style={styles.signatureLine}>
                    Class Teacher’s Signature
                  </Text>
                  <Text style={styles.signatureLine}>
                    Head Teacher’s Signature
                  </Text>
                </View>
              </View>
            </View>
          </Page>
        ))}
      </Document>
    </PDFViewer>
  );
}
