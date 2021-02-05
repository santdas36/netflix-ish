const stripe = require("stripe")(process.env.STRIPE_SK);

export default async (request, response) => {
	if (request.method !== 'GET') {
		return response.status(400).send('400 Bad Request');
	}
	const subId = request.query.subId;
	try {
		const deleted = await stripe.subscriptions.del(subId);
		return response.status(200).send(deleted);
	}
	catch (e) {
		return response.status(400).json({
			error: {message: e.message},
		});
	}
}