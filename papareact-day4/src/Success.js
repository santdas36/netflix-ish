import React, {useEffect} from "react";
import {auth, db} from './firebase';
import {useStripe} from '@stripe/react-stripe-js';
import {useLocation} from 'react-router-dom';

function Success({setLoading}) {
	
	const stripe = useStripe();
	
	useEffect(()=> {
		setLoading(true);
		const sessionId = new URLSearchParams(useLocation().search).get('session_id');
		fetch(`/retrieve-session?sessionId=${sessionId}`).then((response)=>response.json()).then((data)=> {console.log(data);setLoading(false);}).catch((error)=> console.log(error.message));
	}, []);
	
  return (
    <div className="profile">
    	Processing...
    </div>
  )
}
export default Success;