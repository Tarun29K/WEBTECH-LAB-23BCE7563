import { useState, useEffect } from "react";

function App() {
  const [data,setData] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);

  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res=>res.json())
      .then(result=>{
        setData(result);
        setLoading(false);
      })
      .catch(()=>{
        setError("Failed to fetch data");
        setLoading(false);
      });
  },[]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {data.map(user=>(
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
