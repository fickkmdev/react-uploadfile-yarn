import { useEffect, useState } from 'react';
import './App.css';
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";

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
          </div>
        )
      })}
    </div>
  );
}

export default App;
