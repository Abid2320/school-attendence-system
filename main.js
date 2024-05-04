import "./style.css";
import studentsData from "./studentsData";
import student from "./student";
import { newStudent, addNewStudent } from "./addStudent";

if (localStorage.getItem("students") === null) {
  saveToLocalStorage(studentsData);
}
let openModal = false;
document.querySelector("#app").innerHTML = `
  <div class="container">
    <div class="header">
      <h1 class="heading">School Attendance</h1>
      <div class="under-line"></div>
    </div>
    <div class="class-info">
      <div class="select-class-wrapper"> 
        <select class="select">
          <option value="1">Class 1</option>
          <option value="2">Class 2</option>
          <option value="3">Class 3</option>
          <option value="4">Class 4</option>
          <option value="5">Class 5</option>
        </select>
        <p class="class-student">Class 1 Students</p>
        <button class="add-student">Add Student</button>
      </div>
    </div>
    <div class="student-container"></div>
    <div class="modal-container"></div>
  </div>
`;

const select = document.querySelector(".select");
const studentContainer = document.querySelector(".student-container");
let allStudents;
let students;
let selectedElement = "Class 1";
// adding event listener to render and retrieve data from localstorage
document.addEventListener("DOMContentLoaded", () => {
  allStudents = JSON.parse(localStorage.getItem("students"));
  students = getStudents(selectedElement);
  render(students);
  attachEventListeners();
});

// adding click event to add student button to open modal
document.querySelector(".add-student").addEventListener("click", () => {
  openModal = true;
  document.querySelector(".modal-container").innerHTML = newStudent(openModal);
  let closeModalBtn = document.querySelector(".close-modal-btn");
  closeModalBtn.addEventListener("click", closeModal);
  let addNewStudentBtn = document.querySelector(".add-new-student-btn");
  addNewStudentBtn.addEventListener("click", () => addingNewStudent());
});

// closing modal logic
function closeModal() {
  openModal = false;
  document.querySelector(".modal-container").innerHTML = "";
}

// listening for any kind of change in the select value and updating the students value
select.addEventListener("change", () => {
  selectedElement = `Class ${select.value}`;
  render(students);
  students = getStudents(selectedElement);
});

// adding student
function addingNewStudent() {
  console.log(addNewStudent());
  if (addNewStudent()) {
    allStudents.push({
      name: addNewStudent(),
      class: selectedElement,
      id: allStudents.length + 1,
      present: false,
    });
    saveToLocalStorage(allStudents);
    render(students);
    closeModal();
  } else {
    return;
  }
}

// filtering the students from the all students
function getStudents(selectedElement) {
  const filteredStudents = allStudents.filter((item) => {
    return item.class === selectedElement;
  });
  return filteredStudents;
}

// toggling the student attendence
function toggleAttendance(index) {
  students[index].present = !students[index].present;
  saveToLocalStorage(allStudents);
  render(students);
}

// rendering the students
function render(students) {
  studentContainer.innerHTML = "";
  students.forEach((element) => {
    document.querySelector(
      ".class-student"
    ).innerHTML = `${element.class} Students`;
    studentContainer.innerHTML += student(element);
  });
  attachEventListeners();
}

// attaching event listener to all the present and not present btn
function attachEventListeners() {
  let presentBtns = document.querySelectorAll(".present-btn");
  let notPresentBtns = document.querySelectorAll(".not-present-btn");

  presentBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      toggleAttendance(index);
    });
  });

  notPresentBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      toggleAttendance(index);
    });
  });
}

// saving to local storage
function saveToLocalStorage(students) {
  localStorage.setItem("students", JSON.stringify(students));
}
