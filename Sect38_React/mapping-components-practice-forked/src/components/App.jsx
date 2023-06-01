import Entry from "./Entry";
import emojipedia from "../emojipedia";

function createEntry(entryEmoji) {
    return (<Entry 
        key={entryEmoji.id}
        name={entryEmoji.name}
        emoji={entryEmoji.emoji}
        meaning={entryEmoji.meaning}
    />);
}

function App() {
    return (
        <div>
            <h1>
                <span>emojipedia</span>
            </h1>
            
            <dl className="dictionary">
                {emojipedia.map(createEntry)}
            </dl>
        </div>
    );
}

export default App;
