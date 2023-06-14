import React, { useState } from "react";

function App() {
    
    const [inputText, setText] = useState("");
    const [items, setItems] = useState([]);
    
    function handleChange(event) {
        const newValue = event.target.value;
        setText(newValue);
    }
    
    function addItem() {
        setItems((prevItems) => {
            return [...prevItems, inputText];
        });
        setText("");
    }
    
    return (
        <div className="container">
            <div className="heading">
                <h1>To-Do List</h1>
            </div>
            <div className="form">
                <input
                    onChange={handleChange}
                    type="text"
                    value={inputText}
                />
                <button onClick={addItem}>
                    <span>Add</span>
                </button>
            </div>
            <div>
                <ul>
                    {items.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
