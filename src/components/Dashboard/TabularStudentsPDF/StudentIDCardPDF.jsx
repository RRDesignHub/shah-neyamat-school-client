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
  const pages = chunkArray(students, 9);

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
                  {/* PHOTO SECTION */}
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

                  {/* TWO COLUMN LAYOUT */}
                  <View style={styles.twoColumnRow}>
                    {/* LEFT COLUMN */}
                    <View style={styles.leftColumn}>
                      <View style={styles.infoRow}>
                        <Text style={styles.label}>Class:</Text>
                        <Text style={styles.value}>
                          {student.className || "—"}
                        </Text>
                      </View>

                      <View style={styles.infoRow}>
                        <Text style={styles.label}>DOB:</Text>
                        <Text style={styles.value}>
                          {student.dateOfBirth
                            ? new Date(student.dateOfBirth).toLocaleDateString(
                                "en-GB",
                              )
                            : "—"}
                        </Text>
                      </View>
                    </View>

                    {/* RIGHT COLUMN */}
                    <View style={styles.rightColumn}>
                      <View style={styles.infoRow}>
                        <Text style={styles.label}>Roll:</Text>
                        <Text style={styles.value}>
                          {student.classRoll || "—"}
                        </Text>
                      </View>

                      <View style={styles.infoRow}>
                        <Text style={styles.label}>Blood:</Text>
                        <Text style={styles.value}>
                          {student.bloodGroup || "—"}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                {/* footer text */}

                <View style={styles.footerText}>
                  <Text style={styles.footerLabel}>Father's Name:</Text>
                  <Text style={styles.footerValue}>
                    {student.fatherName || "—"}
                  </Text>
                </View>

                <View style={styles.footerText}>
                  <Text style={styles.footerLabel}>Mother's Name:</Text>
                  <Text style={styles.footerValue}>
                    {student.motherName || "—"}
                  </Text>
                </View>

                <View style={styles.footerText}>
                  <Text style={styles.footerLabel}>Mobile No:</Text>
                  <Text style={styles.footerValue}>
                    {student.mobileNo ? `0${student.mobileNo}` : "—"}
                  </Text>
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
