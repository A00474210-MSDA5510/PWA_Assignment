var db = new Dexie("studentsDatabase");

/**
 * Define the schema for the database.
 * The database has a single table "students" with a primary key "id" and
 * indexes on the properties "name" and "city".
 */
db.version(1).stores({
  students: "id, name, prio",
});

/**
 * Retrieves all student records from the database.
 */
function getAllStudentsFromDB() {
  if (db && db.students) {
    // check if db and the students table are created
    return db.students.toArray().then((data) => {
      return data;
    });
  } else {
    return undefined;
  }
}

/**
 * Adds a new student record to the database.
 */
function addStudentToDB(name, id, prio) {
  db.students
    .put({ name, id, prio})
    .then(() => true)
    .catch((err) => {
      alert("Ouch... " + err);
    });
}

function removeStudentFromDB(studentId) {
  if (db && db.students) {
    db.students
      .where("id")
      .equals(studentId)
      .delete()
      .then(() => console.log(`Student with ID ${studentId} removed from the database.`))
      .catch((err) => {
        console.error("Error removing student from the database:", err);
      });
  } else {
    console.error("Database or students table not found.");
  }
}

function updatePriorityInDB(studentId, newPriority) {
  if (db && db.students) {
    db.students
      .where("id")
      .equals(studentId)
      .modify({ prio: newPriority })
      .then(() => console.log(`Priority of student with ID ${studentId} updated to ${newPriority}.`))
      .catch((err) => {
        console.error("Error updating student priority:", err);
      });
  } else {
    console.error("Database or students table not found.");
  }
}

/**
 * Queries the database for students by name.
 * (Not used in the app, just to showcase Dexie's capabilities)
 */
async function queryByName(name) {
  if (name === undefined) return 0;
  return await db.students
    .filter((student) => {
      return student.name === name;
    })
    .toArray();
}



// Ref -> https://dexie.org/docs/Tutorial/Hello-World
