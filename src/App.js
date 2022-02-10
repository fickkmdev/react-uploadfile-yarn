import { useEffect, useState } from 'react';
import './App.css';
import { db } from "./firebase-config";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc} from "firebase/firestore";

function App() {
  const [newName, setNewName] = useState("")
  const [newPhoneNumber, setNewPhoneNumber] = useState("")
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const [hidden, setHidden] = useState(false)
  const [status, setStatus] = useState(true)
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
  }, [status]);

  const addNewUser = async()=>{
    await addDoc(usersCollectionRef, {name:newName, p_number:newPhoneNumber})
    //alert("add user success")
    setStatus(!status)
    setNewName("")
    setNewPhoneNumber("")
  }

  const updateUser = async(id, p_number)=>{
    const userDoc = doc(db, "users", id)
    const newField = {p_number: p_number+"+"}
    await updateDoc(userDoc, newField)
    //alert("update user success")
    setStatus(!status)
  }

  const deleteUser = async(id)=>{
    const userDoc = doc(db, "users", id)
    await deleteDoc(userDoc)
    //alert("delete user success")
    setStatus(!status)
  }

    return (
      <div className="App">
        <input
        value={newName}
          placeholder='name'
          type={'text'}
          onChange={(event)=>{
            setNewName(event.target.value)
          }}
        />
        {" "}
        <input
        value={newPhoneNumber}
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
        <button
        onClick={()=>{
          setHidden(!hidden)
          console.log(hidden)
        }}
        >
          Hide
        </button>
        {!hidden && users.map((user, index) => {
          return (
            <div key={index}>
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
