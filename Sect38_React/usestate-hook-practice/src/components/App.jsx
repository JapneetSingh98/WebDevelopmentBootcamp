import { useState } from "react";

export default function App() {
    
    const [timeString, setTimeString] = useState("TIME");

    setInterval(updateTime, 1000);
    
    function updateTime() {
        setTimeString(new Date().toLocaleTimeString());
    }

    return (
        <div className="container">
            <h1>{timeString}</h1>
            <button onClick={updateTime}>Get Time</button>
        </div>
    );
}
