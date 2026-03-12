const studName = "Tarun Kumar";
const marks = [95,90,84,88,87];

let totalMarks = 0;
for(const mark of marks) {
    totalMarks += mark;
}

const calcAvg = (totalMarks, totalCount) => totalMarks/totalCount;
const avgMarks = calcAvg(totalMarks, marks.length);

console.log(`Student Name : ${studName}`);
console.log(`Total Marks : ${totalMarks}`);
console.log(`Average Marks : ${avgMarks}`);
