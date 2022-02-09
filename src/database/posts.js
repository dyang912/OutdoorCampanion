import {child, get, orderByChild, ref, set, remove, update} from "firebase/database";
import {getStorage, ref as reference, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {db} from "./firebase";
import {getRandomInt} from "./utils";

export function addToGroupChat(postKey, uid) {
    set(ref(db, 'groupchats/' + postKey + "/members/" + [uid]), {
        "position": "Member",
    }).then(() => {
        alert("join success!")
    }).catch((error) => {
        console.log(error);
    });
}

function finishPosting(writtentext, UName, UEmail, category, navigate, url, time, address, uid){
    const postkey = getRandomInt();
    set(ref(db, 'groupchats/' + postkey), {
        members: {[uid] : {"position": "Creator"}},
    }).catch((error) => {
        console.log(error);
    });
    set(ref(db, 'posts/' + postkey), {
      text: writtentext,
      time: Date.now(),
      postKey: postkey,
      creator: UName,
      creatorEmail: UEmail,
      category: category,
      image: url,
      heldTime: time.toString(),
      address: address
    }).then(() => {
      alert("post success!")
      navigate('/')
    }).catch((error) => {
      console.log(error);
    });
}

export async function make_post(writtentext, UName, UEmail, category, navigate, file, time, address, uid) {
    if (file) {
        const storage = getStorage();

        // Create the file metadata
        /** @type {any} */
        const metadata = {
            contentType: 'image/jpeg'
        };

        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = reference(storage, 'images/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                    default:
                        break
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL

                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    finishPosting(writtentext, UName, UEmail, category, navigate, downloadURL, time, address, uid);
                });
            }
        );
    } else {
        finishPosting(writtentext, UName, UEmail, category, navigate, "", time, address, uid);
    }
}

export async function fetch_posts() {
    return await get(child(ref(db), `posts`, orderByChild('time'))).then((snapshot) => {
        const postArray = [];
        snapshot.forEach(function(child) {
            postArray.push(child.val());
        });
        if (snapshot.exists()) {
            postArray.sort((a, b) => b.time - a.time);
            return postArray;
        }
    }).catch((error) => {
        console.error(error);
    });
}

export async function delete_post(postkey){
    remove(ref(db, 'groupchats/' + postkey), {
    }).catch((error) => {
        console.log(error);
    });
    remove(ref(db, 'posts/' + postkey)).then(() => {
        alert("delete success!")
    }).catch((error) => {
        console.log(error);
    });
}

export async function like_post(postKey, UEmail){
    const user= UEmail.replaceAll(".", "_");
    const post_path = 'posts/' + postKey + '/likes/' + user;
    set(ref(db, post_path), {
        user: UEmail,
    }).then(() => {
        alert("like success!")
    }).catch((error) => {
        console.log(error);
    });
    let poster = "";
    let like_path = "";
    let current_likes = 0;
    get(ref(db, 'posts/' + postKey)).then((snapshot) => {
        poster = snapshot.val().creatorEmail;
        poster = poster.replaceAll(".", "_");
        like_path = 'users/' + poster;
        console.log(like_path);
    }).then(() => get(ref(db, like_path)).then((snapshot) => {
        console.log(like_path);
        console.log(snapshot.val());
        if (snapshot.val().likes != null){
            current_likes = snapshot.val().likes +1;
        }
        else{
            current_likes = 1 ;
        }
    })).then(() => update(ref(db, like_path), {
        likes: current_likes,
    })).then(() => {
        alert("like success!")
    }).catch((error) => {
        console.log(error);
    });
}

export async function unlike_post(postKey, UEmail){
    const user= UEmail.replaceAll(".", "_");
    const path = 'posts/' + postKey + '/likes/' + user;
    remove(ref(db, path), {
        user: UEmail,
    }).then(() => {
        alert("unlike success!")
    }).catch((error) => {
        console.log(error);
    });
    var poster = "";
    var like_path = "";
    var current_likes = 0;
    get(ref(db, 'posts/' + postKey)).then((snapshot) => {
        poster = snapshot.val().creatorEmail;
        poster = poster.replaceAll(".", "_");
        like_path = 'users/' + poster;
        console.log(like_path);
    }).then(() => get(ref(db), like_path).then((snapshot) => {
        if (snapshot.val().likes != null){
            current_likes = snapshot.val().likes -1;
        }
    })).then(() => update(ref(db, like_path), {
        likes: current_likes,
    })).then(() => {
        alert("unlike success!")
    }).catch((error) => {
        console.log(error);
    });
}

export async function check_if_liked(postKey, UEmail, setLiked) {
    const path = 'posts/' + postKey + '/likes/';
    return await get(ref(db, path)).then((snapshot) => {
        snapshot.forEach((val) => {
            if (val.val().user === UEmail){
                setLiked(true);
             }
        });
    }).catch((error) => {
        console.error(error);
    });
}