import React from 'react'
import { auth, provider } from '../db-config/firebase-config'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function LoginWithGoogle({setIsAuth}) {
    let navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            localStorage.setItem('isAuth', true);
            setIsAuth(true);
            navigate('/')
        })
    }

    return (
        <div className='App'>
            <p>LoginWithGoogle</p>
            <button
                onClick={signInWithGoogle}
            >
                Sign in with Google
            </button>
        </div>
    )
}

export default LoginWithGoogle