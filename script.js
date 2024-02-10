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
  const actionInput = document.querySelector("[name='actionItem']");
  const toDoList = document.getElementById("todoLists");
  // Retrieve existing students from the database
  const existingStudents = (await getAllStudentsFromDB()) || [];

  // Populate initial student list
  existingStudents.forEach((ActionItem) => {
    addTodoItem(ActionItem.name, ActionItem.id, ActionItem.prio, false);
  });

  /**
   * Adds a student to the list and updates the IndexedDB.
   */
  function addTodoItem(actionItem, id, prio, is_adding_new) {
    // Create student elements
    console.log(id)
    const div = document.createElement("div");
    div.id = id
    div.classList.add("newTodoItem");
    const h1 = document.createElement("h2");
    h1.textContent = actionItem;
    const dropDown = document.createElement('select');
    
    const defaultOption = document.createElement('option')
    defaultOption.value = 3;
    defaultOption.textContent = 'undefined';
    defaultOption.selected = true;
    dropDown.appendChild(defaultOption);

    const option_1 = document.createElement('option');
    option_1.value = 0;
    option_1.textContent = 'High';
    dropDown.appendChild(option_1);

    const option_2 = document.createElement('option');
    option_2.value = 1;
    option_2.textContent = 'Medium';
    dropDown.appendChild(option_2);

    const option_3 = document.createElement('option');
    option_3.value = 2;
    option_3.textContent = 'Low';
    dropDown.appendChild(option_3);
    dropDown.classList.add('prioritySelect');
    dropDown.value = prio
    
    dropDown.addEventListener('change', function() {
      // Get the selected value
      const selectedValue = dropDown.value;
      addTaskPrio(id, selectedValue)
      console.log('Selected value:', selectedValue);
    });

    // Create remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add('removeButton');
    removeButton.addEventListener("click", () => {
      removeStudentById(id);
    });

    // Append to DOM
    div.append(h1, dropDown, removeButton);
    const ifItemExists = toDoList.querySelector(`#${id}`);
    if (ifItemExists === null){
      console.log("ADDED NEW ITEM")
    toDoList.appendChild(div);
    }

    // Add student to IndexedDB
    if (is_adding_new === true){
      addStudentToDB(actionItem, id, prio); // Assuming addStudentToDB is defined
    }
    // Clear input fields
    [actionInput].forEach((input) => (input.value = ""));
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


  async function addTaskPrio(studentId, prio){
    updatePriorityInDB(studentId, prio)
    const children = Array.from(toDoList.children);
    children.sort((a, b) => {
      const priorityA = parseInt(a.querySelector('.prioritySelect').value);
      const priorityB = parseInt(b.querySelector('.prioritySelect').value);
      return priorityA - priorityB;
    });
    children.forEach(child => {
      toDoList.appendChild(child); // This effectively reorders the elements
    });
  }

  // Handle form submission
  form.onsubmit = (event) => {
    event.preventDefault();
    addTodoItem(actionInput.value,"A"+CryptoJS.MD5(actionInput.value).toString(), 3, true);
  };
}

// Initialize service worker and main application logic
registerServiceWorker();
main();