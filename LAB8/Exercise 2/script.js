const student = {
    id : 7563,
    name : "Tarun",
    dept : "CSE",
    marks : 93
}

const {id, name, dept, marks} = student;
console.log(`\nStudent Details ->`)
console.log(student);

const calcGrade = (score) => {
    if(score >= 90) return "S";
    if(score >= 80) return "A";
    if(score >= 70) return "B";
    if(score >= 60) return "C";
    if(score >= 50) return "D";
    return "F";
}

const grade = calcGrade(marks);

const updatedStudent = {
    ...student,
    grade: grade
}

console.log(`\nUpdated Student Details ->`)
console.log(updatedStudent);

