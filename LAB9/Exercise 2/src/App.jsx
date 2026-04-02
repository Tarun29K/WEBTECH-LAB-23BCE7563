import StudentCard from "./StudentCard";

function App() {
  return (
    <div>
      <h1>Student Cards</h1>
      <StudentCard name="Tarun Kumar" department="CSE" marks="85" />
      <StudentCard name="Aditya" department="ECE" marks="88" />
      <StudentCard name="Subro Ghose" department="AI & ML" marks="92" />
      
    </div>
  );
}

export default App;
