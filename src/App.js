import './App.css';
import {useState} from 'react';
import firebase from "./database/firebase";
import {add_user, verify_user} from "./database/users";

function App() {
    const [name , setName] = useState();
    const [pw , setPW] = useState();

    const [name2 , setName2] = useState();
    const [pw2 , setPW2] = useState();

    const [divText, setDivText] = useState("N/A");
    const changeText = (text) => setDivText(text);

    return (
    <div className="App">
        <h1>test register</h1>
        <input placeholder="Enter your name" value={name}
               onChange={(e) => setName(e.target.value)}/>
        <br></br>
        <input placeholder="Enter your password" value={pw}
               onChange={(e) => setPW(e.target.value)} />
        <br></br>
        <button onClick={() => add_user(name, pw)}>register</button>

        <h1>test login</h1>
        <input placeholder="Enter your name" value={name2}
               onChange={(e) => setName2(e.target.value)}/>
        <br></br>
        <input placeholder="Enter your password" value={pw2}
               onChange={(e) => setPW2(e.target.value)} />
        <br></br>
        <button onClick={() =>  {
            verify_user(name2, pw2).then(value => {
                console.log(value)
                changeText(`${value}`)
            })
        }}>login</button>
        <div>{divText}</div>
    </div>
    );
}

export default App;
