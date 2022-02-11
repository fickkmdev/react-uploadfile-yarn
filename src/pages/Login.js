import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../db-config/firebase-config';

function Login() {

  const [newUsername, setNewUsername] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState({})

  onAuthStateChanged(auth,(currentUser)=>{
    setUser(currentUser)
  })

  const clear = () =>{
    setUsername("")
    setPassword("")
    setNewPassword("")
    setNewUsername("")
  }

  const register = async () => {
    try{
      const user = await createUserWithEmailAndPassword(auth, newUsername, newPassword)
      clear()
    }
    catch(error){
      alert(error.message)
    }
   
  }

  const login = async () => {
    try{
      const user = await signInWithEmailAndPassword(auth, username, password)
      clear()
    }
    catch(error){
      alert(error.message)
    }
    
  }

  const logout = async () => {
    await signOut(auth)
  }

  return (
    <div className="App">
      <div>
        <h2>Signin</h2>
        <input
          placeholder='username'
          onChange={(event) => { setNewUsername(event.target.value) }}
          value={newUsername}
        />
        {" "}
        <input
          placeholder='password'
          onChange={(event) => { setNewPassword(event.target.value) }}
          value={newPassword}
        />
        <button
          onClick={register}
        >signin</button>
      </div>

      <div>
        <h2>Login</h2>
        <input
          placeholder='username'
          onChange={(event) => { setUsername(event.target.value) }}
          value={username}
        />
        {" "}
        <input
          type={"password"}
          placeholder='password'
          onChange={(event) => { setPassword(event.target.value) }}
          value={password}
        />
        <button
          onClick={login}
        >login</button>
      </div>

      <div>
        <h3>
          Login user: {user?.email} 
          <button
            onClick={logout}
          >logout</button>
        </h3>
      </div>
    </div>
  );
}

export default Login;