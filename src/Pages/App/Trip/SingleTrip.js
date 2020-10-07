import React from 'react'

function SingleTrip(props) {
  const trip = props.location.state.trip
  console.log(props.location.state.trip);
  return (
		<div>
			<h1>{trip.title}</h1>
			<ul>
				<li>
					<b>Departure:</b> {trip.from}
				</li>
				<li>
					<b>Arrival:</b> {trip.to}
				</li>
				<li>
					<b>Countries:</b> {trip.countries}
				</li>
				<li>
					<b>Base currency:</b> {trip.baseCurrency}
				</li>
				<li>
					<b>Additional currencies:</b> {trip.additionalCurrencies}
				</li>
				<li>
					<b>Budget:</b> {trip.budget}
				</li>
			</ul>
		</div>
	);
}

export default SingleTrip
