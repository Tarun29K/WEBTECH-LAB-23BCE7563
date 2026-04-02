function StudentProfile() {
  const name = "Tarun Kumar";
  const department = "Computer Science and Engineering";
  const year = "3rd Year";
  const section = "A";

  return (
    <div>
      <h1>Student Profile</h1>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Department:</strong> {department}</p>
      <p><strong>Year:</strong> {year}</p>
      <p><strong>Section:</strong> {section}</p>
    </div>
  );
}

export default StudentProfile;
