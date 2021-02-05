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
	
	const initAnim ={{opacity: 0, y: '1rem'}};
	const animAnim ={{opacity: 1, y: 0}};
  return (
    <div className="about">
    	<motion.div transition={{staggerChildren: 0.1}} initial={{opacity: 0, y: '5rem'}} exit={{opacity: 0, y: '5rem'}}  animate={{opacity: 1, y: 0}}class="about__inner">
			<motion.h1 initial={initAnim} animate={animAnim}>Unlimited films, TV shows and more.</motion.h1>
			<motion.h2 initial={initAnim} animate={animAnim}>What anywhere. Cancel anytime.</motion.h2>
			<motion.form initial={initAnim} animate={animAnim} onSubmit={handleSubmit} class="subscribe">
				<input type="email" value={email} required onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email address..."/>
				<button>Try 30 Days FREE</button>
			</motion.form>
			<motion.p initial={initAnim} animate={animAnim}>Ready to watch? Enter your email to create or access your account.</motion.p>
		</motion.div>

    </div>
  )
}
export default About;