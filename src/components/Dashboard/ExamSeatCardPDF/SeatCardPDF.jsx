import {
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  Image,
} from "@react-pdf/renderer";
import { styles } from "./Style";

// Utility function to chunk students into groups of 20
const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

export default function SeatCardPDF({ students, examName }) {
  // Split students into pages (20 per page)
  const pages = chunkArray(students, 20);
  return (
    <PDFViewer width="100%" height="600px">
      <Document>
         {pages.map((pageStudents, pageIndex) => (
          <Page key={pageIndex} size="A4" style={styles.page}>
            <View style={styles.container}>
              {pageStudents.map((student, index) => (
                <View key={index} style={styles.card}>
                  {/* School Header */}
                  <Text style={styles.schoolName}>
                    Shah Neyamat (RH:) KG & High School
                  </Text>
                  <View style={styles.divider} />
                  <Text style={styles.examName}>
                    {examName} Exam {student?.session}
                  </Text>

                  {/* Student Image */}
                  <Image
                    src={
                      student?.image || "https://i.ibb.co.com/V0jk4tCT/images.png"
                    }
                    style={styles.studentImage}
                  />

                  {/* Student Info */}
                  <View style={styles.info}>
                    <Text style={styles.infoText}>
                      <Text style={styles.label}>Name: </Text>
                      {student?.studentName}
                    </Text>

                    {/* Class & Roll in same row */}
                    <View style={styles.row}>
                      <Text style={styles.infoText}>
                        <Text style={styles.label}>Class: </Text>
                        {student?.className}
                      </Text>
                      <Text style={[styles.infoText, { marginLeft: 15 }]}>
                        <Text style={styles.label}>Roll: </Text>
                        {student?.classRoll}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </Page>
        ))}
      </Document>
    </PDFViewer>
  );
}
