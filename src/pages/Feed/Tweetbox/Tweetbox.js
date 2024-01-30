import React, { useState, useEffect } from 'react';
import { Avatar, Button } from '@mui/material';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import './TweetBox.css';
import axios from 'axios';
import useLoggedInUser from '../../../hooks/useLoggedInUser';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import Subscribe from '../../Subscribe/Subscribe';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Tweetbox = () => {
  
  const [post, setPost] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [cooldown, setCooldown] = useState(false); 
  const loggedInUser = useLoggedInUser();
  const [user] = useAuthState(auth);
  const email = user?.email;
  const userProfilepic = loggedInUser[0]?.profileImage || (
    <AddPhotoAlternateOutlinedIcon />
  );
  const storedSubscriptionPlan = localStorage.getItem('subscriptionPlan') || 'free';
  const storedPaymentProcessed = localStorage.getItem('paymentProcessed') === 'true';

  const [subscriptionPlan, setSubscriptionPlan] = useState(storedSubscriptionPlan);
  const [paymentProcessed, setPaymentProcessed] = useState(storedPaymentProcessed);

  useEffect(() => {
    localStorage.setItem('subscriptionPlan', subscriptionPlan);
    localStorage.setItem('paymentProcessed', paymentProcessed);
  }, [subscriptionPlan, paymentProcessed]);

  const [tweetCount, setTweetCount] = useState(0);

  const handleUploadImage = (e) => {
    setIsLoading(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.set('image', image);
    axios
      .post(
        'https://api.imgbb.com/1/upload?key=fda45f6cd272b13a34ca62edb992bf02',
        formData
      )
      .then((res) => {
        setImageURL(res.data.data.display_url);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
  const handleTweet = (e) => {
    e.preventDefault();
  
    let tweetLimit;
    let tweetCooldown;
  
    if (subscriptionPlan === 'silver') {
      tweetLimit = 5;
      tweetCooldown = 60000;
      console.log("subscribed to silver");
    } else if (subscriptionPlan === 'gold') {
      tweetLimit = Infinity;
      tweetCooldown = 0;
      console.log("subscribed to gold");
    } else {
      tweetLimit = 1;
      tweetCooldown = 60000;
      console.log("subscribed to free");
    }
  
    if (tweetCount >= tweetLimit) {
      toast.error(`Exceeded limit Subscribe to a higher plan to tweet more`);
      return;
    }
  
    if (cooldown) {
      toast.error(`Please wait for 1 minute before posting again.`);
      return;
    }
  
    if (user.providerData[0].providerId) {
      fetch(`https://birdie-backend-ux74.onrender.com/loggedInUser?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data[0]?.name);
          setUsername(data[0]?.username);
          handlePostSubmission();
        });
    } else {
      setName(user?.displayName);
      setUsername(email?.split('@')[0]);
      handlePostSubmission();
    }
  
    function handlePostSubmission() {
      if (name) {
        const userPost = {
          profilePhoto: userProfilepic.toString(),
          post: post,
          photo: imageURL,
          username: username,
          name: name,
          email: email,
          subscriptionPlan:subscriptionPlan,
        };
  
        setTweetCount(tweetCount + 1);
        setCooldown(true);
        setTimeout(() => setCooldown(false), tweetCooldown);
  
        setPost('');
        setImageURL('');
  
        fetch(`https://birdie-backend-ux74.onrender.com/post`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(userPost),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
      }
    }
  };
  
  return (
    <div className="tweetBox" > 
      <form onSubmit={handleTweet}>
        <div className="tweetBox__input">
          <Avatar />
          <input
            type="text"
            placeholder="What's happening"
            onChange={(e) => setPost(e.target.value)}
            value={post}
            required
          />
        </div>
        <div className="imageIcon_tweetButton">
          <label htmlFor="image" className="imageIcon">
            {isLoading ? (
              <p>Uploading image</p>
            ) : (
              <p>{imageURL ? 'Image uploaded' : <AddPhotoAlternateOutlinedIcon />}</p>
            )}
          </label>
          <input
            type="file"
            id="image"
            className="imageInput"
            onChange={handleUploadImage}
          />
          <Button className="tweetBox__tweetButton" type="submit">
            Post
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Tweetbox;
