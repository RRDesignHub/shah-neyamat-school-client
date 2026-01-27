import React from "react";
import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import { styles } from "./Style";

// chunk students into 12 per page (3 × 4)
const chunkArray = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

const StudentIDCardPDF = ({ students }) => {
  const pages = chunkArray(students, 12);

  return (
    <Document>
      {pages.map((pageStudents, pageIndex) => (
        <Page key={pageIndex} size="A4" style={styles.page}>
          <View style={styles.container}>
            {pageStudents.map((student) => (
              <View key={student._id} style={styles.card}>
                {/* HEADER */}
                <View style={styles.header}>
                  <Text style={styles.schoolName}>
                    Shah Neyamat (RH:) KG & High School
                  </Text>
                </View>

                {/* BODY */}
                <View style={styles.content}>
                  {/* PHOTO */}
                  <View style={styles.photoSection}>
                    <Image
                      src={
                        student.image || "https://i.ibb.co/V0jk4tCT/images.png"
                      }
                      style={styles.image}
                    />
                  </View>

                  {/* ID BADGE */}
                  <View style={styles.idBadge}>
                    <Text style={styles.sidText}>ID: {student.studentID}</Text>
                  </View>

                  {/* NAME */}
                  <Text style={styles.nameText}>{student.studentName}</Text>

                  {/* CLASS & ROLL */}
                  <View style={styles.detailRow}>
                    <Text style={styles.textSm}>
                      <Text style={styles.label}>Class: </Text>
                      {student.className}
                    </Text>
                    <Text style={styles.textSm}>
                      <Text style={styles.label}>Roll: </Text>
                      {student.classRoll}
                    </Text>
                  </View>

                  {/* DOB & BLOOD */}
                  <View style={styles.detailRow}>
                    <Text style={styles.textSm}>
                      <Text style={styles.label}>DOB: </Text>
                      {student.dateOfBirth
                        ? new Date(student.dateOfBirth).toLocaleDateString(
                            "en-GB",
                          )
                        : "—"}
                    </Text>
                    <Text style={styles.textSm}>
                      <Text style={styles.label}>B: </Text>
                      {student.bloodGroup || "—"}
                    </Text>
                  </View>

                  {/* MOBILE */}
                  <View style={styles.mobileBox}>
                    <Text style={styles.mobileText}>
                      Mob: 0{student.mobileNo}
                    </Text>
                  </View>
                </View>

                {/* FOOTER */}
                <View style={styles.footer}>
                  <Text>Principal's Signature</Text>
                </View>
              </View>
            ))}
          </View>
        </Page>
      ))}
    </Document>
  );
};

export default StudentIDCardPDF;
