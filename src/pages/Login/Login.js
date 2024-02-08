import React, { useState, useEffect } from 'react';
import FlutterDashRoundedIcon from '@mui/icons-material/FlutterDashRounded';
import auth from '../../firebase.init';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import { AES } from 'crypto-js';
import birdieback from '../../assets/birdieback.jpeg';
import Cookies from 'js-cookie';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [blockedUntil, setBlockedUntil] = useState(Cookies.get('blockedUntil'));
  const navigate = useNavigate();

  const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  useEffect(() => {
    if (loginAttempts >= 3 && !blockedUntil) {
      const blockedUntilTime = new Date().getTime() + 2 * 60 * 1000;
      setBlockedUntil(blockedUntilTime);
      Cookies.set('blockedUntil', blockedUntilTime, { expires: new Date(blockedUntilTime) });
      setLoginAttempts(0);
    }
  }, [loginAttempts, blockedUntil]);

  const secretKey = '353e361be8f96c0d3d85e3f234e0489ceb1aed67eb7b752d460224b191e5f558';
  const iv = '86430e96dc28453e18442dc055b487ba';

  const encryptMessage = (message) => {
    return AES.encrypt(message, secretKey, { iv }).toString();
  };

  const handleSignInError = (errorCode) => {
    if (errorCode !== 'auth/popup-closed-by-user') {
      setLoginAttempts(loginAttempts + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (blockedUntil && blockedUntil > new Date().getTime()) {
      console.log(`Account is currently locked. Try again in ${Math.ceil(
        (blockedUntil - new Date().getTime()) / (60 * 1000)
      )} minutes.`);
    } else {
      try {
        await signInWithEmailAndPassword(email, password);
        setLoginAttempts(0);
      } catch (error) {
        handleSignInError(error.code);
      }
    }
  };

   const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            await googleSignIn();
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    };

  if (user || googleUser) {
    navigate('/');
  }

  return (
    <>
      <div className="login-container">
        <div className="image-container">
          <img className="image" src={birdieback} alt="twitterImage" />
        </div>

        <div className="form-container">
          <div className="form-box">
            <FlutterDashRoundedIcon style={{ color: "skyblue" }} />
            <h2 className="heading">Happening now</h2>

            {error && <p>{error.message}</p>}
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                className="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                className="password"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="btn-login">
                <button type="submit" className="btn">Log In</button>
              </div>
            </form>
            <hr />
            <div>
              {blockedUntil && blockedUntil > new Date().getTime() ? (
                <div>
                  <p>
                    Account is currently locked. Try again in {Math.ceil(
                      (blockedUntil - new Date().getTime()) / (60 * 1000)
                    )} minutes.
                  </p>
                </div>
              ) : (
                <div>
                  <p>{3 - loginAttempts} attempt(s) left.</p>
                  <GoogleButton className="g-btn" type="light" onClick={handleGoogleSignIn} />
                </div>
              )}
            </div>
          </div>
          <div>
            Don't have an account?
            <Link
              to="/signup"
              style={{
                textDecoration: 'none',
                color: 'var(--twitter-color)',
                fontWeight: '600',
                marginLeft: '5px',
              }}
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;





