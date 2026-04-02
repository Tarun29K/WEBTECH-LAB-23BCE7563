import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  const addItem = () => {
    if (!input) return;
    setItems([...items, input]);
    setInput("");
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>Dynamic List</h1>
      <input value={input} onChange={(e)=>setInput(e.target.value)} />
      <button onClick={addItem}>Add</button>

      {items.length === 0 ? (
        <p>No items available</p>
      ) : (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item}
              <button onClick={()=>removeItem(index)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
