import React from "react";
import Card from "./Card";
import contacts from "../contacts";

function App() {
    let cards = [];
    contacts.forEach((contact, index) => {
        cards.push(
            <Card 
                name={contact.name}
                imgURL={contact.imgURL}
                phone={contact.phone}
                email={contact.email}
            />
        )
    });

    return (
        <div>
            <h1 className="heading">My Contacts</h1>
            {cards}
        </div>
    );
}

export default App;
