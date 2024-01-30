import React, { useEffect,useState } from 'react'
import './Feed.css';
import TweetBox from "./Tweetbox/Tweetbox";
import Post from './Post';

const Feed = ({subscriptionPlan}) => {
  const [posts, setPosts] = useState([]);
  useEffect(()=>{
     fetch(`https://birdie-backend-ux74.onrender.com/post`)
     .then(res=>res.json())
     .then(data=>{
      setPosts(data);
     })
  },[posts])
  return (
    <> 
    <div className="feed" style={{marginTop:'20px'}}>
      <TweetBox/>
    {
      posts.map(p=><Post key={p._id} p={p} />)
    }
    </div>
    </>
   
  )
}

export default Feed