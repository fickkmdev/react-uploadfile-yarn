import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../db-config/firebase-config'
import { addDoc, collection } from 'firebase/firestore'

function CreatePost({isAuth}) {
    let navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [postText, setPostText] = useState("")

    const postCollectionRef = collection(db, 'posts')

    useEffect(()=>{
        if(!isAuth){
            navigate('/login')
        }
    },[])

    const createPost = async() =>{
      await addDoc(postCollectionRef,{auther:{name: auth.currentUser.displayName , id: auth.currentUser.uid},title,postText})
    navigate('/')
    }

  return (
    <div className='App'>
      <div>
        <h1>Create Post</h1>
        <div>
          <label>title</label>
          <input 
            placeholder='title'
            onChange={(event)=>{setTitle(event.target.value)}}
          />
        </div>
        <div>
          <label>post</label>
          <textarea 
            placeholder='post'
            onChange={(event)=>{setPostText(event.target.value)}}
          />
        </div>
        <button
          onClick={createPost}
        >submit post</button>
      </div>
    </div>
  )
}

export default CreatePost