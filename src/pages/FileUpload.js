import { getDownloadURL, ref, uploadBytesResumable, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react'
import { storage } from '../db-config/firebase-config';

function FileUpload() {

    const [uploadProgress, setUploadProgress] = useState(0)
    const [file, setFile] = useState(null)
    const [url, setUrl] = useState('')

    const uploadFile = () => {
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
                getDownloadURL(uploadTask.snapshot.ref).then((url)=>alert(`success!! URL: ${url}`))
            }
        );
        }

    const handleFile = (e) =>{
        if(e.target.files[0]){
            setFile(e.target.files[0]);
        }
    }

    return (
        <div>
            <h1>FileUpload</h1>
            <form>
                <input
                    style={{ border: "solid 1px coral" }}
                    type='file'
                    onChange={handleFile}
                />
                <button
                    onClick={uploadFile}
                >upload</button>
            </form>
            <p>upload progress : {uploadProgress} %</p>
        </div>
    )
}

export default FileUpload