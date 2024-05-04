function student(student) {
  let activeGreen = "";
  let activeRed = "";
  if (student.present) {
    activeGreen = "active-green";
    activeRed = "";
  } else {
    activeGreen = "";
    activeRed = "active-red";
  }
  return `
    <div class="student-box">
        <h2 class="student-name">${student.name}</h2>
        <p class="student-class">${student.class}</p>
        <div class="student-box-btn">
            <button class="present-btn ${activeGreen}">Present</button>
            <button class="not-present-btn ${activeRed}">Not Present</button>
        </div>
    </div>
    `;
}

const presentBtn = document.querySelector(".present-btn");
const notPresentBtn = document.querySelector(".not-present-btn");

export default student;
