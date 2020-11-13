import React, { useEffect, useState } from 'react';

import axios from 'axios';

import Spinner from '../../../components/Spinner/Spinner';

const QuickNotes = ({ match }) => {
	const [notes, setNotes] = useState(null)
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		(async () => {
			try {
				/* getting user token */
				const user = JSON.parse(localStorage.getItem('user'));
				const token = user.token;
				const tripID = match.params.id;

				/* getting authorized response */
				const res = await axios.get(`/trips/${tripID}/notes`, {
					headers: {
						'x-auth-token': token,
					},
					params: {
						id: tripID,
					},
				});

				/* getting notes */
				const notes = await res.data.notes;
				console.log('Notes Data', notes);

				/* passing days Ids to Use State Days*/
				setNotes(notes)
				setIsLoaded(true);

			} catch (error) {
				console.log('Error', error.message);
			}
		})();
}, [match.params.id, setNotes]);

	return (
		<section
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-evenly',
				alignItems: 'center',
				contentVisibility: 'auto',
				marginBottom: '60px',
			}}
		>
			{isLoaded ? (
				!notes?.length > 0 ? (
					<h2>There are no notes here!</h2>
				) : (
					notes.map((note, idx) => (
						<div
							key={note._id}
							style={{
								height: '20vh',
								width: '50vw',
								margin: '5%',
								border: '1px solid black',
							}}
						>
							<h1>{ note.title }</h1>
							<p>{ note.note }</p>
						</div>
					))
				)
			) : (
				<Spinner />
			)}
		</section>
	);
}

export default QuickNotes
