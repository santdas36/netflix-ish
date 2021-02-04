import {useState} from "react";
import "./Login.css";
import {auth} from './firebase';

function Login() {
	
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [signup, setSignup] = useState(false);
	const [loading, setLoading] = useState(false);
	
	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
	}
	
  return (
    <div className="login">
    	<form onSubmit={handleSubmit}>
			<h3>{signup ? 'Sign Up' : 'Login'}</h3>
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
			<button className="google">Sign In with Google</button>
			<p><span>New to Netflix? </span><b style={signup ? {color: '#3cb19f'} : {color: '#ec215f'}} onClick={()=>setSignup(true)}>Sign Up Now.</b></p>
		</form>
    </div>
  )
}
export default Login;