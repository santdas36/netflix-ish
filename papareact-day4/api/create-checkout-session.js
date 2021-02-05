const stripe = require("stripe")(process.env.STRIPE_SK);

export default async (request, response) => {
	if (request.method !== 'POST') {
		return response.status(400).send('400 Bad Request');
	}
	const priceId = request.query.priceId;
	const email = request.query.email;
	try {
	const session = await stripe.checkout.sessions.create({
		success_url: 'https://papareact-day4.vercel.app/success?session_id={CHECKOUT_SESSION_ID}',
		cancel_url: 'https://papareact-day4.vercel.app/profile',
		mode: 'subscription',
		payment_method_types: ['card'],
		customer_email: email,
		line_items: [{
          price: priceId,
          quantity: 1,
        }],
	});
	console.log(session);
	return response.status(201).json({
		sessionId: session.id,
	});
	}
	
	catch (e) {
	return response.status(400).json({
		error: {message: e.message},
	});
	}
}