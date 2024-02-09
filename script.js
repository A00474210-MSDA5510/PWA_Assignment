async function registerServiceWorker() {
  // Register service worker
  if ("serviceWorker" in navigator) {
    // checking if the browser supports service workers
    window.addEventListener("load", function () {
      // when app loads, fire callback
      navigator.serviceWorker.register("/sw.js").then(
        function () {
          // register sw
          console.log("ServiceWorker registration successful"); // registration was successful
        },
        function (err) {
          console.log("ServiceWorker registration failed", err); // registration failed
        }
      );
    });
  }
}

/**
 * Main function to handle the student form and display logic.
 */
async function main() {
  // Select form and input elements
  const form = document.querySelector("form");
  const nameInput = document.querySelector("[name='sname']");
  const studentsList = document.getElementById("students");
  // Retrieve existing students from the database
  const existingStudents = (await getAllStudentsFromDB()) || [];

  // Populate initial student list
  existingStudents.forEach((student) => {
    addStudent(student.name, "A"+CryptoJS.MD5(student.name).toString());
  });

  /**
   * Adds a student to the list and updates the IndexedDB.
   */
  function addStudent(name, id) {
    // Create student elements
    console.log(id)
    const div = document.createElement("div");
    div.id = id
    div.classList.add("student");
    const h1 = document.createElement("h1");
    h1.textContent = name;
    const h2 = document.createElement("h2");
    h2.textContent = id;

    
    // Create remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "GGGggAA1234emove";
    removeButton.addEventListener("click", () => {
      removeStudentById(id);
    });

    // Append to DOM
    div.append(h1, h2, removeButton);
    const ifItemExists = studentsList.querySelector(`#${id}`);
    if (ifItemExists === null){
      console.log("ADDED NEW ITEM")
    studentsList.appendChild(div);
    }

    // Add student to IndexedDB
    addStudentToDB(name, id); // Assuming addStudentToDB is defined

    // Clear input fields
    [nameInput].forEach((input) => (input.value = ""));
  }

  /**
   * Removes a student from the list and updates the IndexedDB.
   */
  function removeStudentById(studentId) {
    // Remove from DOM
    const studentElement = document.getElementById(studentId);
    if (studentElement) {
      studentElement.remove();
      console.log("REMOVED SHIT")
    }

    // Remove from IndexedDB
    removeStudentFromDB(studentId); // Assuming removeStudentFromDB is defined
  }

  // Handle form submission
  form.onsubmit = (event) => {
    event.preventDefault();
    addStudent(nameInput.value,"A"+CryptoJS.MD5(nameInput.value).toString());
  };
}

// Initialize service worker and main application logic
registerServiceWorker();
main();