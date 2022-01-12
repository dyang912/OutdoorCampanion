import {signInWithGoogle, signOut} from "../database/users";

export const SignInButton = ({ setUID, setUName }) => (
    <button onClick={ () => {
        signInWithGoogle().then(([email, name]) => {
            setUID(email);
            setUName(name);
        })
    }} >login</button>
)

export const SignOutButton = ({ setUID, setUName }) => (
    <button onClick={ () => {
        signOut();
        setUID("");
        setUName("");
    }}>logout</button>
)