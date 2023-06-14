import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
    
    const [notes, setNotes] = useState([]);
    
    function addNote(newNote) {
        setNotes((prevState) => [newNote, ...prevState]);
    }
    
    function deleteNote(id) {
        setNotes((prevState) => {
            return prevState.filter((note, index) => {
                return index !== id;
            });
        });
    }
    
    return (
        <div>
            <Header />
            <CreateArea 
                addNote={addNote}
            />
            {notes.map((note, i) => {
                return (
                    <Note
                        key={i}
                        id={i}
                        title={note.title}
                        content={note.content}
                        onDelete={deleteNote}
                    />
                );
            })}
            <Footer />
        </div>
    );
}

export default App;
