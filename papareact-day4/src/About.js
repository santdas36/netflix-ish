import React, {useState, useEffect} from "react";
import "./About.css";
import {auth} from './firebase';
import {useHistory} from 'react-router-dom';
import {motion} from 'framer-motion';

function About() {
	
	const history = useHistory();
	const [email, setEmail] = useState('');
	const handleSubmit = (e) => {
		e.preventDefault();
		if(email) {
			history.push({
				pathname: '/login',
				state: { email: email }
			});
		}
	}
	
  return (
    <div className="about">
    	<motion.div initial={{opacity: 0, y: '5rem'}} exit={{opacity: 0, y: '5rem'}}  animate={{opacity: 1, y: 0}}class="about__inner">
			<h1>Unlimited films, TV shows and more.</h1>
			<h2>What anywhere. Cancel anytime.</h2>
			<form onSubmit={handleSubmit} class="subscribe">
				<input type="email" value={email} required onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email address..."/>
				<button>Try 30 Days FREE</button>
			</form>
			<p>Ready to watch? Enter your email to create or access your account.</p>
		</motion.div>

    </div>
  )
}
export default About;