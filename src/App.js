import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Data from './pages/Data';
import Login from './pages/Login';

function App() {
  return(
    <Router>
      <nev className="nev-bar">
        <Link to='/data' className='link'>Home</Link>
        <Link to='/' className='link'>Login</Link>
      </nev>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/data' element={<Data/>}/>
      </Routes>
    </Router>
  );
}

export default App;
