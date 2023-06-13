import React, { useState } from "react";

export default function App() {
    const [name, setName] = useState("");
    const [inputText, setInputText] = useState("");

    function handleChange(event) {
        setInputText(event.target.value);
    }

    function handleClick(event) {
        setName(inputText);
        setInputText("");
        event.preventDefault();
    }

    return (
        <div className="container">
            <h1>Hello {name}</h1>
            <form onSubmit={handleClick}>
                <input
                    onChange={handleChange}
                    type="text"
                    placeholder="What's your name?"
                    value={inputText}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
