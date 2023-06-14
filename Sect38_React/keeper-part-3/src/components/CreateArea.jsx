import React, { useState } from "react";

function CreateArea(props) {
    const [noteDetails, setNoteDetails] = useState({
        title: "",
        content: ""
    });
    
    function handleChange(event) {
        const {name, value} = event.target;
        setNoteDetails((prevState) => {
            return {
                ...prevState,
                [name]: value
            };
        });
    }
    
    function submitNote(event) {
        event.preventDefault();
        console.log(noteDetails);
        props.addNote(noteDetails);
        setNoteDetails({
            title: "",
            content: ""
        });
    }
    
    return (
        <div>
            <form>
                <input
                    onChange={handleChange}
                    name="title"
                    placeholder="Title"
                    value={noteDetails.title}
                />
                <textarea
                    onChange={handleChange}
                    name="content"
                    placeholder="Take a note..."
                    rows="3"
                    value={noteDetails.content}
                />
                <button onClick={submitNote}>Add</button>
            </form>
        </div>
    );
}

export default CreateArea;
