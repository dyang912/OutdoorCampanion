import {child, get, orderByChild, ref, set, remove} from "firebase/database";
import {getStorage, ref as reference, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {db} from "./firebase";
import {getRandomInt} from "./utils";

function finishPosting(writtentext, UName, UEmail, category, navigate, url, time, address){
  const postkey = getRandomInt();
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

export async function make_post(writtentext, UName, UEmail, category, navigate, file, time, address) {
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
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL

                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    finishPosting(writtentext, UName, UEmail, category, navigate, downloadURL, time, address);
                });
            }
        );
    } else {
        finishPosting(writtentext, UName, UEmail, category, navigate, "", time, address);
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
    remove(ref(db, 'posts/' + postkey)).then(() => {
        alert("delete success!")
    }).catch((error) => {
        console.log(error);
    });
}

export async function like_post(postKey, UEmail){
    const user= UEmail.replace(".", "_");
    const path = 'posts/' + postKey + '/likes/' + user;
    set(ref(db, path), {
        user: UEmail,
    }).then(() => {
        alert("like success!")
    }).catch((error) => {
        console.log(error);
    });

}

export async function unlike_post(postKey, UEmail){
    const user= UEmail.replace(".", "_");
    const path = 'posts/' + postKey + '/likes/' + user;
    remove(ref(db, path), {
        user: UEmail,
    }).then(() => {
        alert("unlike success!")
    }).catch((error) => {
        console.log(error);
    });

}

export async function check_if_liked(postKey, UEmail) {
    const user= UEmail.replace(".", "_");
    const path = 'posts/' + postKey + '/likes/';
    return await get(ref(db, path)).then((snapshot) => {
        snapshot.forEach((val) => {
            console.log(val.val().user);
            if (val.val().user === UEmail){
                return true;
             }
        });
        return false;
    }).catch((error) => {
        console.error(error);
    });
}