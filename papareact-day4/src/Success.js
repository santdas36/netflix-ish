import React, {useEffect, useState} from "react";
import {auth, db} from './firebase';
import {useStripe} from '@stripe/react-stripe-js';
import {useLocation, useHistory} from 'react-router-dom';
import Loading from './Loading';

function Success() {
	
	const stripe = useStripe();
	const location = useLocation();
	const history = useHistory();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	
	useEffect(()=> {
		const sessionId = new URLSearchParams(location.search).get('session_id');
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if(user && sessionId) {
				setLoading(true);
				fetch(`/api/retrieve-session?sessionId=${sessionId}`)
				  .then((response)=>response.json())
				  .then((data)=> {
				  	if (data.session.customer_email === user.email) {
				  		db.collection('users').doc(user.uid).set({
				  			subscription: data.subscription
				  		}, {merge: true}).then(()=> {
				  			history.replace('/profile');
				  			setLoading(false);
				  		});
				  	} else {
				  		setError('Invalid credentials');
				  	}
				  })
				  .catch((error)=> {setError(error.message); setLoading(false);});
			} else {
				setError('You are not logged in!');
			}
	}, []);
	
  return (
    <div className="profile">
    	{loading && <Loading />}
    	{error ? `Some error occurred (${error})` : 'Processing...'}
    </div>
  )
}
export default Success;