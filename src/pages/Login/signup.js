import React, { useState } from 'react'
import FlutterDashRoundedIcon from '@mui/icons-material/FlutterDashRounded';
import auth from '../../firebase.init'
import {useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth'
import GoogleButton from 'react-google-button'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'
import birdieback from '../../assets/birdieback.jpeg';


const Signup = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate();

  const [signInWithGoogle, googleuser] = useSignInWithGoogle(
    auth
  );

  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);
  if(user || googleuser){
    navigate('/')
    console.log(user);
    console.log(googleuser);
  }
  if(error) console.log(error.message);
  if(loading) console.log('loading...')
 

  const handleSubmit=e=>{
    e.preventDefault();
    console.log(email,password);
    createUserWithEmailAndPassword(email,password);

    const user={
        username:username,
        name:name,
        email:email
    }
    axios.post(`https://birdie-backend-ux74.onrender.com/register`,user);
  }
  const handleGoogleSignIn=()=>{
    signInWithGoogle();

  }
  return (
    <>
    <div className="login-container">

        <div className="image-container">
            <img className="image" src={birdieback} alt="birdieImage" />
        </div>
        <div className="form-container">
            <div className="">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <FlutterDashRoundedIcon className="Birdieicon" style={{ color: 'skyblue' }} />
    </div>
                <h2 className="heading">Create-Post-Enjoy</h2>

                <div class="d-flex align-items-sm-center">
                    <h3 className="heading1"> Join Birdie today </h3>
                </div>
                {error && <p className="errorMessage">{error.message}</p>}
                <form onSubmit={handleSubmit}>

                    <input className="display-name" style={{ backgroudColor: "red" }}
                        type="username"
                        placeholder="username "
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input className="display-name" style={{ backgroudColor: "red" }}
                        type="name"
                        placeholder="Enter Full Name"
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input className="email"
                        type="email"
                        placeholder="Email address"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input className="password"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="btn-login">
                        <button type="submit" className="btn">Sign Up</button>
                    </div>
                </form>
                <hr />
                <div className="google-button">
                    <GoogleButton

                        className="g-btn"
                        type="light"
                        onClick={handleGoogleSignIn}
                    />
                </div>
                <div>
                    Already have an account?
                    <Link
                        to="/login"
                        style={{
                            textDecoration: 'none',
                            color: 'var(--twitter-color)',
                            fontWeight: '600',
                            marginLeft: '5px'
                        }}
                    >
                        Log In
                    </Link>
                </div>
            </div>
        </div>
    </div>
</>
  )
}
export default Signup