const stripe = require("stripe")(
  "sk_test_51IHTc9GVr4f6jXHSSCqRsBFJYgb5MEP2LecVsVqGcO0BLpnBzrvDC0ZLRGO3zI5rB7UfHZvTMFvq3IE6F4buTnAP006BUwZO6E"
);

export default async (request, response) => {
	if (request.method !== 'POST') {
		return response.status(400).send('400 Bad Request');
	}
	const priceId = request.query.priceId;
	try {
	const session = await stripe.checkout.sessions.create({
		success_url: 'https://papareact-day4.vercel.app/profile',
		cancel_url: 'https://papareact-day4.vercel.app/profile',
		mode: 'subscription',
		payment_method_types: ['card'],
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