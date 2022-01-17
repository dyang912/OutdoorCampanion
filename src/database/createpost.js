import { getDatabase, ref,set} from "firebase/database";
import { firebase  } from "./firebase";
import { getStorage, ref as reference, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const db = getDatabase();

function getRandomInt() {
  return Math.floor(Math.random() * 1728354123897);
}

function finishPosting(writtentext, userName, category, navigate,url){
  const postkey = getRandomInt();
  set(ref(db, 'posts/' + postkey), {
      text: writtentext,
      time: Date.now(),
      postkey: postkey,
      creator: userName,
      category: category,
      image: url,
  }).then(() => {
      alert("post success!")
      navigate('/')()
  }).catch((error) => {
      console.log(error);
      // alert("error!")
  });


}

async function make_post(writtentext, userName, category, navigate, file) {





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
          finishPosting(writtentext, userName, category, navigate, downloadURL);
        });
      }
    );




}

export { make_post };

// a new section under each post for all the comments on each post
// i tested this and it works possibly even better because less indexing
export function add_post_comment(post, commentTxt) {
    const postKey = getRandomInt();
    //post.comment = post.comment === null ? [commentTxt] : [commentTxt, ...post.comment]
    set(ref(db, 'posts/' + post.postkey + '/comments/' + postKey), {
      text: commentTxt,
      postkey: postKey,
    }).then(() => {
        alert("comment success!")
    }).catch((error) => {
        console.log(error);
    });
}
