const stripe = require("stripe")(process.env.STRIPE_SK);

export default async (request, response) => {
	if (request.method !== 'GET') {
		return response.status(400).send('400 Bad Request');
	}
	const sessionId = request.query.sessionId;
	const email = request.query.email;
	try {
		const session = await stripe.checkout.sessions.retrieve(sessionId);
		console.log(session);
		return response.status(200).send(session);
	}
	catch (e) {
		return response.status(400).json({
			error: {message: e.message},
		});
	}
}