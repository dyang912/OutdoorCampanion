import React from "react";
import {SignInButton, SignOutButton} from "../components/users";

function Login({ user, UID, setUID, UName, setUName, UPhotoUrl, setUPhotoUrl}) {
    return (
        <div>
            {user ? null : <p className = "login-header">Login to unlock the outdoors!</p> }
            { user ? <SignOutButton setUID={setUID} setUName={setUName} setUPhotoUrl = {setUPhotoUrl}/> :
                      <SignInButton setUID={setUID} setUName={setUName} setUPhotoUrl = {setUPhotoUrl}/> }
            <div className="row">
                <div className="col" id ="profile-photo-container">
                    {user?  <img className = "profile-photo" src={UPhotoUrl} alt="UserPhoto"/> : null}
                </div>
                <div className="col">
                    {user? <div>Your Name: {UName ? UName : "NULL"}</div> : null}
                    {user? <div>Your email: {UID ? UID : "NULL"}</div> : null}
                </div>
            </div>


        </div>
    );
}

export default Login;