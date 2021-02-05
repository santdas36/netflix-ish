import React, {useState, useEffect} from "react";
import "./Login.css";
import {auth, provider} from './firebase';
import {useHistory, useLocation} from 'react-router-dom';

function Login() {
	
	const history = useHistory();
	const location = useLocation();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [signup, setSignup] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	
	const googleSignIn = (e) => {
		e.preventDefault();
		setLoading(true);
	    auth.signInWithPopup(provider).then((result) => {
			setLoading(false);
		}).catch((error) => setError(error.message));
	};
	
	useEffect(()=> {
		if (location.state && location.state.email) {
			setEmail(location.state.email);
		}
	}, []);
	
	useEffect(()=> {
		if (error) {
			setTimeout(()=> {
				setError(null);
			}, 10000);
		}
	}, [error]);
	
	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		if (signup) {
			auth.createUserWithEmailAndPassword(email, password).then(() => {
      		auth.currentUser.updateProfile({
              		displayName: name,
              		photoURL: `https://avatars.dicebear.com/4.5/api/gridy/${email}.svg`,
            	});
            }).catch((error) => {setError(error.message); setLoading(false)});
		} else {
			auth.signInWithEmailAndPassword(email, password).then(()=> {
				setLoading(false);
			}).catch((error) => {setError(error.message); setLoading(false)});
		}
	}
		
  return (
    <div className="login">
    	<form onSubmit={handleSubmit}>
			<h3>{signup ? 'Sign Up' : 'Login'}</h3>
			{error && <p className="error">{error}</p>}
			{signup &&
			<div className="input">
				<label>Full Name</label>
				<input type="text" required={signup} value={name} onChange={(e)=>setName(e.target.value)} placeholder="John Doe" />
			</div>
			}
			<div className="input">
				<label>Email Address</label>
				<input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="johndoe@gmail.com" />
			</div>
			<div className="input">
				<label>Password</label>
				<input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="••••••••" />
			</div>
			<button style={signup ? {backgroundColor: '#ec215f'} : {backgroundColor: '#3cb19f'}} disabled={loading}>{loading ? (signup ? 'Signing up...' : 'Logging In...') : (signup ? 'Create Account' : 'Log In')}</button>
			<button onClick={googleSignIn} className="google">Sign In with Google</button>
			<p><span>{signup ? 'Already have an account?' : 'New to Netflix?'}{' '}</span><b style={signup ? {color: '#3cb19f'} : {color: '#ec215f'}} onClick={()=>{if(!loading){setSignup(!signup)}}}>Sign Up Now.</b></p>
		</form>
    </div>
  )
}
export default Login;