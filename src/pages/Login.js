import React from "react";
import {SignInButton, SignOutButton} from "../components/users";

function Login({ user, UID, setUID, UName, setUName}) {
    return (
        <div>
            <h1>Login</h1>
            { user ? <SignOutButton setUID={setUID} setUName={setUName}/> :
                      <SignInButton setUID={setUID} setUName={setUName}/> }
            <div>Your Name: {UName ? UName : "NULL"}</div>
            <div>Your email: {UID ? UID : "NULL"}</div>
        </div>
    );
}

export default Login;