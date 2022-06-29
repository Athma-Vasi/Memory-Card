import Container from '../styled-generics/Container'
import Card from '../styled-generics/Card'

import { emojisData } from '../../emojisData'

import { EmojisArr, State, Dispatch, Action } from '../../types'

import { useState } from 'react'
import { randomSliceOfEmojis } from '../../helperFunctions'

function GameBoard({
	state,
	dispatch,
	action,
}: {
	state: State
	dispatch: React.Dispatch<Dispatch>
	action: Action
}): JSX.Element {
	// const [subsetEmojis, setSubsetEmojis] = useState<EmojisArr>(state.subsetEmojis)
	const [allEmojis, setAllEmojis] = useState(state.allEmojis)
	const [clickedEmojis, setClickedEmojis] = useState<Set<string>>(new Set())
	const [score, setScore] = useState(0)
	const [highScore, setHighScore] = useState(state.highScore)
	const [level, setLevel] = useState(1)

	// const increaseGameLevel = (function (clickedEmojis_: Set<string>) {
	// 	if (clickedEmojis_.size === 10) {
	// 		let newAllEmojis: EmojisArr = []
	// 		setLevel(level + 1)
	// 		newAllEmojis = randomSliceOfEmojis(allEmojis, level)

	// 		setAllEmojis(newAllEmojis)

	// 		dispatch({
	// 			type: action.cardClick,
	// 			payload: {
	// 				allEmojis: newAllEmojis,
	// 				clickedEmojis: new Set(),
	// 				score: 0,
	// 				level: level,
	// 				highScore: highScore,
	// 			},
	// 		})
	// 	}
	// })(clickedEmojis)

	function handleCardClick(ev: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
		const emoji = ev.currentTarget.dataset.emoji ?? ''

		const shuffledArray = (function (array: EmojisArr): EmojisArr {
			let clone = structuredClone(array)

			clone.sort(() => Math.random() - 0.5)
			return clone
		})(allEmojis)

		setAllEmojis(shuffledArray)
		console.log(allEmojis)

		if (!clickedEmojis.has(emoji)) {
			setClickedEmojis(clickedEmojis.add(emoji))

			setScore(score + 1)
		} else {
			storeHighScore(score)
			setScore(0)
			setClickedEmojis(new Set())
			//game over function
			console.warn('game over')
		}
		console.log(clickedEmojis)
	}

	function storeHighScore(score_: number): void {
		if (!localStorage.getItem('highScore')) {
			localStorage.setItem('highScore', JSON.stringify(score_))
		}

		const storageHighScore: number = JSON.parse(localStorage.getItem('highScore') ?? '0')

		console.log({ storageHighScore })

		if (score_ > storageHighScore) {
			setHighScore(score_)
			localStorage.setItem('highScore', JSON.stringify(score_))
		}
	}

	console.log({ score })
	console.log({ highScore })

	return (
		<>
			<Container>
				{allEmojis.map((emoji, index) => (
					<div className="emojis" key={index}>
						<Card onClick={handleCardClick} data-emoji={emoji.character}>
							<p style={{ transform: 'scale(4)' }}>{emoji.character}</p>
							<p>{emoji.unicodeName.replace(/(E)/, ' ')}</p>
						</Card>
					</div>
				))}
			</Container>
		</>
	)
}

export default GameBoard

// if (!localStorage.getItem('clickedCards')) {
//   localStorage.setItem('clickedCards', JSON.stringify([]))
// }

// const clickedCards: string[] = JSON.parse(localStorage.getItem('clickedCards') ?? '')

// if (!clickedCards.includes(emoji)) {
//   clickedCards.push(emoji)
//   localStorage.setItem('clickedCards', JSON.stringify(clickedCards))
// } else {
// }

//const apiKey = 'cb0ed2596d9221e2efb489d3f9dc5b658732aa5a'
