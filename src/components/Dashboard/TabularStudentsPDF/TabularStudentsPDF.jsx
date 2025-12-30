import {
  Page,
  Text,
  View,
  Document,
  Image,
  PDFViewer,
} from "@react-pdf/renderer";
import { styles } from "./Style";
import { format } from "date-fns";

export default function TabularStudentInfoPDF({ students }) {
 
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
              <Text style={styles.title}>
                Shah Neyamat (RH:) KG & High School
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  textAlign: "center",
                  opacity: 0.6,
                }}
              >
                Karnaphuli, Chattogram || ESTD: 2004
              </Text>
              <Text style={styles.subtitle}>
                Student Information Sheet | Class:{" "}
                {students && students[0]?.className} | Session:{" "}
                {students && students[0]?.session}
              </Text>
            </View>

            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text
                style={[styles.headerCell, { flex: 0.4, textAlign: "center" }]}
              >
                Roll
              </Text>
              <Text style={[styles.headerCell, { flex: 1.5 }]}>Name</Text>
              <Text style={[styles.headerCell, { flex: 1.5 }]}>Date Of Birth</Text>
              <Text style={[styles.headerCell, { flex: 1.5 }]}>Brth Reg. No</Text>
              <Text style={[styles.headerCell, { flex: 1 }]}>Mobile No</Text>
              
            </View>

            {/* Table Rows */}
            {students
              ?.slice(0, 30)
              ?.sort((a, b) => a.classRoll - b.classRoll)
              ?.map((item, index) => (
                <View key={item._id || index} style={styles.tableRow}>
                  <Text
                    style={[styles.cell, { flex: 0.2, textAlign: "center" }]}
                  >
                    {item.classRoll}
                  </Text>
                  <Text style={[styles.nameCell, { flex: 1.5 }]}>
                    {item.studentName}
                  </Text>
                 
                  <Text style={[styles.cell, { flex: 0.8 }]}>
                    {format(new Date(item?.dateOfBirth), "dd MMM yyyy")}
                  </Text>
                  <Text
                    style={[styles.cell, { flex: 1}]}
                  >
                    {item.birthRegNo || ""}
                  </Text>
                  <Text
                    style={[styles.cell, { flex: 0.8}]}
                  >
                    0{item.mobileNo || ""}
                  </Text>
                </View>
              ))}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
