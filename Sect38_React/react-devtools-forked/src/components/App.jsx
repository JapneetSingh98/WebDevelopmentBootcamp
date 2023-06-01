import Card from "./Card";
import Avatar from "./Avatar";
import contacts from "../contacts";

function createCard(contact) {
    return <Card 
        key={contact.id}
        name={contact.name}
        img={contact.imgURL}
        tel={contact.phone}
        email={contact.email}
    />;
}

function App() {
  return (
    <div>
      <h1 className="heading">My Contacts</h1>
      <Avatar img="https://media.licdn.com/dms/image/C4D03AQG_-wLAWq0PqQ/profile-displayphoto-shrink_800_800/0/1563307757851?e=2147483647&v=beta&t=q0D1jGVFdGoGwfmK5_h86HLb_cNPO2yKtCGIyGo7XnQ" />

      {contacts.map(createCard)}
    </div>
  );
}

export default App;
