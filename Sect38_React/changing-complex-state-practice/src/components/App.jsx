import React, { useState } from "react";

function App() {
    const [contact, setContact] = useState({
        fName: "",
        lName: "",
        email: "",
    });
    
    function handleChange(event) {
        const { value, name } = event.target;
        
        setContact( prevValue => {
            switch (name) {
                case "fName":
                    return {
                        fName: value,
                        lName: prevValue.lName,
                        email: prevValue.email
                    };
                case "lName":
                    return {
                        fName: prevValue.fName,
                        lName: value,
                        email: prevValue.email
                    };
                case "email":
                    return {
                        fName: prevValue.fName,
                        lName: prevValue.lName,
                        email: value
                    };
            }
        });
    }

    return (
        <div className="container">
            <h1>
                Hello {contact.fName} {contact.lName}
            </h1>
            <p>{contact.email}</p>
            <form>
                <input
                    onChange={handleChange}
                    name="fName"
                    placeholder="First Name" 
                    vallue={contact.fName}
                />
                <input
                    onChange={handleChange}
                    name="lName"
                    placeholder="Last Name" 
                    value={contact.lName}
                />
                <input
                    onChange={handleChange}
                    name="email"
                    placeholder="Email" 
                    value={contact.email}
                />
                <button>Submit</button>
            </form>
        </div>
    );
}

export default App;
