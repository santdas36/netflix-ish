import React, {useEffect, useState} from "react";
import "./Profile.css";
import userIcon from './assets/nfuser.jpg';
import {auth, db, analytics} from './firebase';
import {useStripe} from '@stripe/react-stripe-js';
import firebase from 'firebase';
import {toast} from 'react-toastify';
import {motion} from 'framer-motion';

function Profile({user, setLoading}) {
	
	const [subs, setSubs] = useState({});
	const [processing, setProcessing] = useState(false);
	const [activePack, setActivePack] = useState('');
	const stripe = useStripe();
	
	const packs = [{title: 'Netflix Mobile', d1: 'Mobile only', d2: '480p SD Streaming', price: '19.99', duration: 'month', priceId: 'price_1IHThZGVr4f6jXHSzK1GUgJd'},
{title: 'Netflix Lite', d1: 'Two screens', d2: '720p SD Streaming', price: '29.99', duration: 'month', priceId: 'price_1IHTmPGVr4f6jXHSav4jhyQg'},
{title: 'Netflix HD', d1: 'Max 5 screens', d2: '1080p HD Streaming', price: '39.99', duration: 'month', priceId: 'price_1IHTs5GVr4f6jXHSID3JNFyr'},
{title: 'Netflix Premium', d1: 'Unlimited screens', d2: '4K UHD Streaming', price: '499.99', duration: 'year', priceId: 'price_1IHTucGVr4f6jXHSbmX7mkFI'},]

	const checkout = async (priceId) => {
		setLoading(true);
		if (subs.id) {
			cancelSubs();
		}
		fetch(`/api/create-checkout-session?priceId=${priceId}&email=${user.email}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
		}).then((result) => result.json()).then((data) => {
			console.log(data);
			if (data.error) {
				console.log(data.error.message)
			} else {
				analytics.logEvent(`started_subscription`);
				toast.info('Redirecting...');
				stripe.redirectToCheckout({
					sessionId: data.sessionId,
				}).then((response) => {console.log(response);setLoading(false);});
			}
		}).catch((error) => console.log(error.message));
	}
	
	const cancelSubs = () => {
		setProcessing(true);
		fetch(`/api/cancel?subId=${subs.id}`).then(()=> {
			db.collection('users').doc(user.uid).update({
				subscription: firebase.firestore.FieldValue.delete()
			});
			setProcessing(false);
			analytics.logEvent('unsubscribed');
			toast.info('Your subscription was cancelled!');
		}).catch((err)=> {console.log(err.message);setProcessing(false);});	
	}

	useEffect(()=> {
		const unsubscribe = db.collection('users').doc(user.uid).onSnapshot((data)=> {
			const subAvailable = data.data().subscription;
			if (subAvailable) {
				setSubs(subAvailable);
				setActivePack(subAvailable.plan.id);
			} else {
				setSubs({});
				setActivePack('');
			}
		});
		
		return unsubscribe;
	}, []);
	
  return (
    <div className="profile">
    	<div className="profile__header">
<img src={user?.photoURL || userIcon} />
<h1>Hi, {user?.displayName}!</h1>
		<button className="signout" onClick={()=> {auth.signOut();toast.info('You are now signed out!');}}>Sign Out</button>
</div>
<h3>{activePack ? 'Manage your subscription' : 'Subscribe Now to Start Watching'}</h3>
<div className="packs">
{packs.map((pack, index) => (
	<motion.div initial={{opacity: 0}} transition={{delay: 0.1*index}} animate={{opacity: 1}} className={pack.priceId === activePack ? 'pack active' : 'pack'}>
		<h3>{pack.title}</h3>
		<ul className="desc">
		<li>{pack.d1}</li>
		<li>{pack.d2}</li>
		</ul>
		<p className="price">$ {pack.price}<small>/{pack.duration}</small></p>
		<button disabled={pack.priceId === activePack} onClick={(e)=> checkout(pack.priceId)}>{pack.priceId === activePack ? `Renews in ${parseInt((subs.current_period_end - subs.current_period_start)/(24*60*60))} day(s)` : 'Activate Now'}</button>
	</motion.div>
))}
</div>
<p className="pack__info">All plans come with a 30 days FREE trial period. Cancel anytime.</p>
{activePack && <button disabled={processing} className="cancel" onClick={cancelSubs}>Cancel Subscription</button>}
    </div>
  )
}
export default Profile;