import { useEffect, useState } from 'react';
import './App.css';
import { db } from "./firebase-config";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc} from "firebase/firestore";

function App() {
  const [newName, setNewName] = useState("")
  const [newPhoneNumber, setNewPhoneNumber] = useState("")
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map(
        (doc) => (
          { ...doc.data(), id: doc.id }
        )
      ))
    };

    getUsers();
  }, []);

  const addNewUser = async()=>{
    await addDoc(usersCollectionRef, {name:newName, p_number:newPhoneNumber})
  }

  const updateUser = async(id, p_number)=>{
    const userDoc = doc(db, "users", id)
    const newField = {p_number: p_number+"+"}
    await updateDoc(userDoc, newField)
  }

  const deleteUser = async(id)=>{
    const userDoc = doc(db, "users", id)
    await deleteDoc(userDoc)
  }

  return (
    <div className="App">
      <input
        placeholder='name'
        type={'text'}
        onChange={(event)=>{
          setNewName(event.target.value)
        }}
      />
      {" "}
      <input
        placeholder='phone number'
        type={'text'}
        onChange={(event)=>{
          setNewPhoneNumber(event.target.value)
        }}
      />
      {" "}
      <button
        onClick={addNewUser}>
        Add
      </button>
      {users.map((user) => {
        return (
          <div>
            {" "}
            <p>Name: {user.name}</p>
            <p>Phone number: {user.p_number}</p>
            <button
              onClick={()=>{
                updateUser(user.id, user.p_number)
              }}
            >update</button>{" "}
            <button
              onClick={()=>{
                deleteUser(user.id)
              }}
            >delete</button>
          </div>
        )
      })}
    </div>
  );
}

export default App;
