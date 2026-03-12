class Course {
    constructor(courseName, faculty, seats) {
        this.courseName = courseName;
        this.faculty = faculty;
        this.seats = seats;
        this.enrolledStudents = 0;
    }

    displayCourse() {
        console.log(`Course Details ->`);
        console.log(` Course Name : ${this.courseName} \n Faculty : ${this.faculty} \n Available Seats : ${this.seats - this.enrolledStudents}`);
    }
}

const course = new Course("Javascript ES6", "Dr. Gopikrishnan", 2);
course.displayCourse();

const enrollCourse = (course) => {
    return new Promise((resolve, reject) => {
        let available = course.seats - course.enrolledStudents;
        if(available > 0){
            course.enrolledStudents++;
            resolve("Course registered !");
        } else {
            reject("course Full !");
        }
    });
}


enrollCourse(course)
    .then(res => {
        console.log(res);
        return enrollCourse(course);
    })
    .then(res => {
        console.log(res);
        return enrollCourse(course);
    })
    .then(console.log)
    .catch(console.error);