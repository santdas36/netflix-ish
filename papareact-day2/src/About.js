import React, {useState, useEffect} from "react";
import "./About.css";
import {auth} from './firebase';
import {useHistory} from 'react-router-dom';

function About() {
	
	const history = useHistory();
	const [email, setEmail] = useState('');
	const handleSubmit = (e) => {
		e.preventDefault();
	}
	
  return (
    <div className="about">
    	<div class="about__inner">
			<h1>Unlimited films, TV shows and more.</h1>
			<h2>What anywhere. Cancel anytime.</h2>
			<div class="subscribe">
				<input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email address..."/>
				<button onClick={handleSubmit}>Try 30 Days FREE</button>
			</div>
			<p>Ready to watch? Enter your email to create or access your account.</p>
		</div>

    </div>
  )
}
export default About;