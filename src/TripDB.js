const trip = {
	user: [UserIDs],
	title: String,
	departureDate: Date,
	arrivalDate: Date,
	numberOfDays: arrivalDate - departureDate,
	countries: [countryIDs],
	additionalCurrencies: [Currencies],
	budget: Number,
	BackgroundImage: imageURL,
	days: [
		// Day 1
		{
			Country: String,
			Place: String,
			accommodation: {
				accomodationType: String,
				name: String,
				address: String,
				notes: String,
				email: String,
				website: String,
				phone: String,
				contactName: String,
				cost: Number,
				currency: String,
			},
			// URLs to the attachments or similar
			attachments: [URLs],
			photos: [URLs],
			events: [
				// each object in the array represents an event
				{
					eventType: String,
					name: String,
					description: String,
					isItMustSee: Boolean,
					// Time but didn't know how to represent it.
					scheduledFor: Date(),
					country: String,
					place: String,
					address: String,
					email: String,
					website: String,
					phone: String,
					contact: String,
					attachments: [URLs],
					photos: [URLs],
					amount: String,
					currency: String,
				},
			],
		},
		// Day 2
		// Same as day one.
	],
};