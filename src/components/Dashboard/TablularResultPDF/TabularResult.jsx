import {
  Page,
  Text,
  View,
  Document,
  Image,
  PDFViewer,
} from "@react-pdf/renderer";
import { styles } from "./Style";


export default function TabularResultPDF({ resultData }) {
  return (
   <PDFViewer width="100%" height="600px">
       <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.tableContainer}>
          {/* Transparent Background Logo */}
          <Image src="/logo.png" style={styles.bgLogo} />
          {/* Header */}
                    <View>
                      <Image
                        src="/logo.png"
                        style={{ height: 50, width: 50, position: "absolute", left: 4 }}
                      />
                      <Text style={styles.title}>Shah Neyamat (RH:) KG & High School</Text>
                      <Text style={{ fontSize: 11, fontWeight: 500, textAlign: "center", opacity: 0.8 }}>
                        Karnaphuli, Chattogram || ESTD: 2004
                      </Text>
                      <Text style={styles.subtitle}>
                        {resultData[0]?.examName} Exam : {resultData[0]?.session} | Class: {resultData[0]?.className}
                      </Text>
                    </View>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, { flex: 0.8 }]}>Roll</Text>
            <Text style={[styles.headerCell, { flex: 2 }]}>Student Name</Text>
            <Text style={[styles.headerCell, { flex: 1 }]}>Total Marks</Text>
            <Text style={[styles.headerCell, { flex: 1 }]}>GPA</Text>
            <Text style={[styles.headerCell, { flex: 1 }]}>Letter Grade</Text>
            <Text style={[styles.headerCell, { flex: 1 }]}>Position</Text>
          </View>

          {/* Table Rows */}
          {resultData
            ?.sort((a, b) => a.classRoll - b.classRoll) // Highest marks first
            ?.map((item, index) => (
              <View key={item._id || index} style={styles.tableRow}>
                <Text style={[styles.cell, { flex: 0.8 }]}>{item.classRoll}</Text>
                <Text style={[styles.nameCell, { flex: 2 }]}>{item.studentName}</Text>
                <Text style={[styles.cell, { flex: 1 }]}>{item.totalMarks}</Text>
                <Text style={[styles.cell, { flex: 1 }]}>
                  {item.totalGPA?.toFixed(2)}
                </Text>
                <Text style={[styles.cell, { flex: 1 }]}>{item.totalLG}</Text>
                <Text style={[styles.cell, { flex: 1 }]}>{item.totalLG === "F" ? "--" : item.position}</Text>
              </View>
            ))}
        </View>
      </Page>
    </Document>
     </PDFViewer>
  );
}
