import { getDownloadURL, ref, uploadBytesResumable, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react'
import { storage } from '../db-config/firebase-config';

function FileUpload() {

    const [uploadProgress, setUploadProgress] = useState(0)
    const [url, setUrl] = useState('')

    const formHandeler = (e) => {
        e.preventDefault();
        const file = e.target[0].files[0]
        console.log(file)
        uploadFile(file)
    }

    const uploadFile = (file) => {
        console.log(file)
        if (!file) return;
        const storageRef = ref(storage, `/product/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on("state_changed", (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            setUploadProgress(progress)
        },
            (error) => {
                alert(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setUrl(url)
                })
            }
        );
    }



    return (
        <div>
            <h1>FileUpload</h1>
            <form onSubmit={formHandeler}>
                <input
                    style={{ border: "solid 1px coral" }}
                    type='file'
                    onChange={(e) => {
                        console.log(e.target.files[0])
                    }}
                />
                <button
                    type='submit'
                >upload</button>
            </form>
            <p>upload progress : {uploadProgress} %</p>
            {url ? <><h1>Success!!</h1>
            <img src={url}
            style={{width:'100%'}}
            />
            </>: <></>}
        </div>
    )
}

export default FileUpload