import React from "react";
import {SignInButton, SignOutButton} from "../components/users";

function Login({ user, UID, setUID, UName, setUName}) {
    return (
        <div>
            {user ? null : <p className = "login-header">Login to unlock the outdoors!</p> }
            { user ? <SignOutButton setUID={setUID} setUName={setUName}/> :
                      <SignInButton setUID={setUID} setUName={setUName}/> }
            {user? <div>Your Name: {UName ? UName : "NULL"}</div> : null}
            {user? <div>Your email: {UID ? UID : "NULL"}</div> : null}
        </div>
    );
}

export default Login;