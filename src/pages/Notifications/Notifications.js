
import '../Page.css'
import {useState} from 'react'
function Notifications() {

    const [counter, setCounter] = useState(0);
    const inc =()=>{
        setCounter(counter +1);
    }
    return (
        <>
            <div className='page'>
                <h2 className='pageTitle'> you've clicked {counter} times</h2>
                <button className='ib' onClick={inc} >increment</button>
            </div>
        </>
    )
}

export default Notifications