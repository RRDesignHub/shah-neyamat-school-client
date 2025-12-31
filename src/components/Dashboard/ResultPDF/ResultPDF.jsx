
import {
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  Image,
} from "@react-pdf/renderer";
import { styles } from "./Style";

export default function ResultPDF({result}) {
  return (
    <PDFViewer width="100%" height="600px">
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.container}>
            {/* Transparent Overlay Logo */}
            <Image src="/logo.png" style={styles.overlayLogo} />

            {/* Header */}
            <View>
              <Image src="/logo.png" style={styles.headerLogo} />
              <Text style={styles.title}>
                Shah Neyamat (RH:) KG & High School
              </Text>
              <Text style={styles.subtitleSmall}>
                Karnaphuli, Chattogram || ESTD: 2004
              </Text>
              <Text style={styles.subtitle}>
                {result?.examName} Exam Result: {result?.session}
              </Text>
            </View>
            <View style={styles.divider} />

            {/* Student Info */}
            <View style={styles.infoContainer}>
              <View style={styles.infoLeft}>
                <View style={styles.infoRowText}>
                  <Text style={styles.infoLabelInline}>Student Name:</Text>
                  <Text style={styles.infoValueInline}>
                    {result?.studentName}
                  </Text>
                </View>
                <View style={styles.infoRowText}>
                  <Text style={styles.infoValueText}>Father's Name:</Text>
                  <Text style={styles.infoValueText}>
                    {result?.fatherName}
                  </Text>
                </View>
                <View style={styles.infoRowText}>
                  <Text style={styles.infoValueText}>Mother's Name:</Text>
                  <Text style={styles.infoValueText}>
                    {result?.motherName}
                  </Text>
                </View>
                <View style={styles.infoRowText}>
                  <Text style={styles.infoValueText}>Class:</Text>
                  <Text style={styles.infoValueText}>
                    {result?.className}
                  </Text>
                </View>
                <View style={styles.infoRowText}>
                  <Text style={styles.infoValueText}>Roll:</Text>
                  <Text style={styles.infoValueText}>
                    {result?.classRoll}
                  </Text>
                </View>
              </View>

              <View style={styles.infoRight}>
                <Image
                  src={result?.image || "/placeholder.png"}
                  style={styles.studentImage}
                />
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Total Marks:</Text>
                  <Text style={styles.infoValue}>{result?.totalMarks}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>GPA:</Text>
                  <Text style={styles.infoValue}>
                    {result?.totalGPA < 1 ? 0 : result?.totalGPA?.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Letter Grade:</Text>
                  <Text style={styles.infoValue}>{result?.totalLG}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Status:</Text>
                  <Text style={styles.infoValue}>{result?.status}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Position:</Text>
                  <Text style={styles.infoValue}>{result?.totalLG === "F" ? "--" : result?.position}</Text>
                </View>
              </View>
            </View>

            {/* Result Table */}
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableCellSubject}>Subject Name</Text>
                <Text style={styles.tableCellOther}>Marks</Text>
                <Text style={styles.tableCellOther}>Grade Point</Text>
                <Text style={styles.tableCellOther}>Letter Grade</Text>
              </View>
              {result?.resultData?.map((subject, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCellSubject}>
                    {subject?.subjectName}
                  </Text>
                  <Text style={styles.tableCellOther}>
                    {subject?.marks}/{subject?.totalMarks}
                  </Text>
                  <Text style={styles.tableCellOther}>{subject?.GPA}</Text>
                  <Text style={styles.tableCellOther}>
                    {subject?.letterGrade}
                  </Text>
                </View>
              ))}
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.signature}>Class Teacher Signature</Text>
              <Text style={styles.signature}>Principal Signature</Text>
              <Text style={styles.signature}>Guardian Signature</Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
