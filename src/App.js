import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import CreatePost from './pages/CreatePost';
import Posts from './pages/Posts';
import LoginWithGoogle from './pages/LoginWithGoogle';
import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './db-config/firebase-config'


function App() {

  useEffect(()=>{
    setIsAuth(localStorage.getItem('isAuth'))
  }
    ,
  [])

  const [isAuth, setIsAuth] = useState(false);

  const signUserOut = () =>{
    signOut(auth).then(()=>{
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname = '/login'
    })
  }

  return(
    <Router>
      <nav className="nav-bar">
        <Link to='/' className='link'>Home</Link>
        <Link to='/createpost' className='link'>CreatePost</Link>
        {isAuth?<button onClick={signUserOut}>logout</button>:<Link to='/login' className='link'>Login with Google</Link>}
      </nav>
      <Routes>
        <Route path='/' element={<Posts isAuth={isAuth}/>}/>
        <Route path='/createpost' element={<CreatePost isAuth={isAuth}/>}/>
        <Route path='/login' element={<LoginWithGoogle setIsAuth={setIsAuth}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
