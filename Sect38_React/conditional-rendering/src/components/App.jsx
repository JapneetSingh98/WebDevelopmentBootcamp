import Login from "./Login";

let isLoggedIn = false;

const currentTime = new Date().getHours();

console.log(currentTime);

export default function App() {
    return (
        <div className="container">
            {isLoggedIn ? <h1>Hello</h1> : <Login />}
            {currentTime > 12 ? <h1> Why are you still working? </h1> : null}
            {currentTime > 12 && <h1> Why are you still working? </h1>}
        </div>
    );
}
