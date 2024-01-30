import React from 'react'
// import '../page.css'
// import { useUserAuth } from "../../context/UserAuthContext"
import MainProfile from './/Mainpage/Mainpage'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

function Profile() {

    const { user } = useAuthState(auth);
    return (
        <div className='profilePage'>
            <MainProfile user={user} />
        </div>
    )
}

export default Profile