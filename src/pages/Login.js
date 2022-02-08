import React from "react";
import {SignInButton, SignOutButton} from "../components/users";
import {check_user_likes} from "../database/users";
import {useState} from "react";

function Login({ user, UEmail, setUEmail, UName, setUName, UPhotoUrl, setUPhotoUrl, setUid}) {
    const [totalLikes, setTotalLikes] = useState(0);

   check_user_likes(UEmail, setTotalLikes);

    return (
        <div>
            { user ? null : <p className = "login-header">Login to unlock the outdoors!</p> }
            { user ? <SignOutButton setUEmail={setUEmail} setUName={setUName} setUPhotoUrl = {setUPhotoUrl} setUid={setUid}/> :
                      <SignInButton setUEmail={setUEmail} setUName={setUName} setUPhotoUrl = {setUPhotoUrl}/> }
            <div className="row">
                <div className="col" id ="profile-photo-container">
                    {user?  <img className = "profile-photo" src={UPhotoUrl} alt="UserPhoto"/> : null}
                </div>
                <div className="col">
                    {user? <div>Your Name: {UName ? UName : "NULL"}</div> : null}
                    {user? <div>Your email: {UEmail ? UEmail : "NULL"}</div> : null}
                    {user? <div> Total likes: {totalLikes} </div> :null}
                    
                </div>
            </div>
        </div>
    );
}

export default Login;