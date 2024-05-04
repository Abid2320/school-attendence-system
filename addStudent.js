export function newStudent(openModal) {
  if (openModal) {
    return `
            <div class="add-student-box">
            <h3 class="add-new-student-title">Add New Student</h3>
                <button class="close-modal-btn">&#x274C;</button>
                <input class="new-student-field" placeholder="Write student name" type="text"/>
                <button class="add-new-student-btn">Add New Student</button>
            </div>
            `;
  } else {
    return "";
  }
}

export function addNewStudent() {
  let newStudentField = document.querySelector(".new-student-field");
  if (newStudentField) {
    return newStudentField.value;
  } else {
    return;
  }
}
