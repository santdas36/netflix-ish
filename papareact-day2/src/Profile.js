import React, {useEffect} from "react";
import "./Profile.css";
import userIcon from './assets/nfuser.jpg';
import {auth} from './firebase';

function Profile({user}) {
	
  return (
    <div className="profile">
    	<div className="profile__header">
<img src={user?.photoURL || userIcon} />
<h1>Hi, {user?.displayName}!</h1>
		<button className="signout" onClick={()=> auth.signOut()}>Sign Out</button>
</div>
<h3>Manage your subscription</h3>
<div className="packs">
	<div className="pack">
		<h3>Netflix Mobile</h3>
		<p className="desc">Mobile only, 480p SD Streaming</p>
		<p className="price">$ 19.99</p>
		<button>Activate Now</button>
	</div>
	<div className="pack">
		<h3>Netflix SD</h3>
		<p className="desc">Two Screens, 480p SD Streaming</p>
		<p className="price">$ 29.99</p>
		<button>Activate Now</button>
	</div>
	<div className="pack active">
		<h3>Netflix HD</h3>
		<p className="desc">Maximum Five Screens, 1080p HD Streaming</p>
		<p className="price">$ 49.99</p>
		<button>Renews in 12 days</button>
	</div>
	<div className="pack">
		<h3>Netflix Premium</h3>
		<p className="desc">Unlimited Screens, 4K UHD Streaming</p>
		<p className="price">$ 99.99</p>
		<button>Activate Now</button>
	</div>
</div>

<button className="cancel">Cancel Subscription</button>
    </div>
  )
}
export default Profile;