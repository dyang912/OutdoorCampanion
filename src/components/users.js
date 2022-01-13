import {signInWithGoogle, signOut} from "../database/users";

export const SignInButton = ({ setUID, setUName }) => (
    <div class="d-grid gap-3 col-3 mx-auto p-2">
    <button type="button" class="btn btn-outline-dark" onClick={ () => {
        signInWithGoogle().then(([email, name]) => {
            setUID(email);
            setUName(name);
        })
    }} >login</button></div>
)

export const SignOutButton = ({ setUID, setUName }) => (
    <div class="d-grid gap-3 col-3 mx-auto p-2">
    <button type="button" class="btn btn-outline-dark" onClick={ () => {
        signOut();
        setUID("");
        setUName("");
    }}>logout</button></div>
)