function StudentCard({ name, department, marks }) {
  return (
    <div style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
      <h2>{name}</h2>
      <p>Department: {department}</p>
      <p>Marks: {marks}</p>
    </div>
  );
}

export default StudentCard;
