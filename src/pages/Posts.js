import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../db-config/firebase-config';

function Posts({isAuth}) {

  const [postList, setPostList] = useState([]);
  const postCollectionRef = collection(db, 'posts')

  useEffect(()=>{
    const getPost = async()=>{
      const data = await getDocs(postCollectionRef)
      setPostList(data.docs.map((doc)=>({ ...doc.data(), id: doc.id})));
    }
    getPost()
  },[])

  const deletePost = async (id) =>{
    const postDoc = doc(db, 'posts', id)
    await deleteDoc(postDoc)
  }

  return (
    <div className='App'>
      <h1>Post</h1>
      {postList.map((post)=>{
        return (
        <div key={post.id}>
          <hr/>
          <h3>Title : {post.title} {isAuth&&post.auther.id===auth.currentUser.uid&&<button onClick={()=>{deletePost(post.id)}}>X</button>}</h3>
          <p>Message: {post.postText}</p>
          <p>@{post.auther.name}</p>
        </div>
      )
      })}
    </div>
  )
}

export default Posts