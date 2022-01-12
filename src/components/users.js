import {signInWithGoogle, signOut} from "../database/users";

export const SignInButton = ({ changeText }) => (
    <button onClick={ () => {
        signInWithGoogle().then(value => {
            changeText(`your email: ${value}`)
        })
    }} >login</button>
)

export const SignOutButton = ({ changeText }) => (
    <button onClick={ () => {
        signOut();
        changeText("your email: NULL");
    }}>logout</button>
)