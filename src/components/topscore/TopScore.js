import { differenceInSeconds } from 'date-fns'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../../languages'
import { useFirebase } from '../../utils/firebase'

const TopScore = ({ to, RoomContext }) => {
	let navigate = useNavigate()
	let t = useTranslation()
	let room_ref = useContext(RoomContext)
	let room = useFirebase(room_ref)

	let seconds_elapsed = differenceInSeconds(
		room.finished_time ?? 0,
		room.start_time ?? 0,
	)

	let hints_penalty = room.hints_penalty ?? 0

	return (
		<div
			style={{
				padding: 32,
				fontSize: '1rem',
				height: '100%',
				position: 'relative',
			}}
		>
			YES! That was the code to her secret office where she was hiding all along!
			Congrats! You solved all the mysteries and found our beloved CEO! We are so
			grateful. Thank you for all the hard work! Remember to take care of each other
			in hard times. And if you have been fast enough, there might be a reward waiting
			for you!
			<br />
			<br />
			{t('You finished in')}{' '}
			<span style={{ color: 'green' }}>
				<span>
					{(seconds_elapsed / 60).toFixed(0)} {t('minutes')}
				</span>{' '}
				{t('and')}{' '}
				<span>
					{(seconds_elapsed % 60).toFixed(0).padStart(2, '0')} {t('seconds')}
				</span>
			</span>{' '}
			{hints_penalty === 0 ? (
				<span>{t('without using any hints!')}</span>
			) : (
				<span>
					{t('with')}{' '}
					<span style={{ color: 'red' }}>
						{room.hints_penalty ?? 0} {t('minutes')}
					</span>{' '}
					{t('penalty for using hints!')}
				</span>
			)}
			<br />
			<br />
			<button
				style={{ position: 'absolute', bottom: 20, left: 0 }}
				onClick={() => navigate(to)}
			>
				{t('Continue')}
			</button>
		</div>
	)
}

export default TopScore
