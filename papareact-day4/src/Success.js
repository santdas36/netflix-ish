import React, {useEffect} from "react";
import {auth, db} from './firebase';
import {useStripe} from '@stripe/react-stripe-js';
import {useLocation} from 'react-router-dom';

function Success({setLoading}) {
	
	const stripe = useStripe();
	const location = useLocation();
	
	useEffect(()=> {
		setLoading(true);
		const sessionId = new URLSearchParams(location.search).get('session_id');
		
		fetch(`/api/retrieve-session?sessionId=${sessionId}`).then((response)=>response.json()).then((data)=> {console.log(data.subscription.status, cata);setLoading(false);}).catch((error)=> console.log(error.message));
	}, []);
	
  return (
    <div className="profile">
    	Processing...
    </div>
  )
}
export default Success;