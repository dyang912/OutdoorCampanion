import {signInWithGoogle, signOut} from "../database/users";

export const SignInButton = ({ setUID, setUName, setUPhotoUrl }) => (
    <div className="d-grid gap-3 col-3 mx-auto p-2">
    <button type="button" className="btn btn-outline-dark" onClick={ () => {
        signInWithGoogle().then(([email, name, photoUrl]) => {
            setUID(email);
            setUName(name);
            setUPhotoUrl(photoUrl);
        })
    }} >login</button></div>
)

export const SignOutButton = ({ setUID, setUName, setUPhotoUrl }) => (
    <div className="d-grid gap-3 col-3 mx-auto m-5">
    <button type="button" className="btn btn-outline-dark" onClick={ () => {
        signOut();
        setUID("");
        setUName("");
        setUPhotoUrl("");
    }}>logout</button></div>
)