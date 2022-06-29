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
	const [clickedEmojis, setClickedEmojis] = useState<Set<string>>(state.clickedEmojis)
	const [score, setScore] = useState(state.score)
	const [highScore, setHighScore] = useState(state.highScore)
	const [level, setLevel] = useState(state.level)

	function increaseGameLevel(emojisData_: EmojisArr, level_: number): void {
		const newAllEmojis = randomSliceOfEmojis(emojisData_, level_)

		if (newAllEmojis) {
			setAllEmojis(newAllEmojis)

			dispatch({
				type: action.cardClick,
				payload: {
					allEmojis: newAllEmojis,
					clickedEmojis: new Set(),
					score: score,
					level: level_,
					highScore: highScore,
				},
			})
		}
	}

	function handleCardClick(ev: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
		if (clickedEmojis.size === 4) {
			setLevel(level + 1)
			setScore(score + 1)
			setClickedEmojis(new Set())
			increaseGameLevel(emojisData, level)
			console.log({ level })
		} else {
			const shuffledArray = (function (arr: EmojisArr | undefined): EmojisArr {
				let clone = structuredClone(arr)

				for (let i = clone.length - 1; i > 0; i -= 1) {
					const j = Math.floor(Math.random() * (i + 1))
					;[clone[i], clone[j]] = [clone[j], clone[i]]
				}

				return clone
			})(allEmojis)

			setAllEmojis(shuffledArray)

			const emoji = ev.currentTarget.dataset.emoji ?? ''

			if (!clickedEmojis.has(emoji)) {
				setClickedEmojis(clickedEmojis.add(emoji))

				setScore(score + 1)

				dispatch({
					type: action.cardClick,
					payload: {
						allEmojis: allEmojis,
						clickedEmojis: clickedEmojis,
						score: score,
						level: level,
						highScore: highScore,
					},
				})
			} else {
				storeHighScore(score)
				setScore(0)
				setClickedEmojis(new Set())
				const newAllEmojis = randomSliceOfEmojis(emojisData)
				if (newAllEmojis) setAllEmojis(newAllEmojis)

				dispatch({
					type: action.cardClick,
					payload: {
						allEmojis: allEmojis,
						clickedEmojis: clickedEmojis,
						score: score,
						level: level,
						highScore: highScore,
					},
				})

				localStorage.setItem('uniqueRandomIndexes', JSON.stringify([]))
				//game over function
				console.warn('game over')
			}
		}
		console.log(clickedEmojis)
	}

	function storeHighScore(score_: number): void {
		if (!localStorage.getItem('highScore')) {
			localStorage.setItem('highScore', JSON.stringify(score_))
		}

		const storageHighScore: number = JSON.parse(localStorage.getItem('highScore') ?? '0')

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
				{allEmojis?.map((emoji, index) => (
					<div className="emojis" key={index}>
						<Card onClick={handleCardClick} data-emoji={emoji.character}>
							<p style={{ transform: 'scale(4)' }}>{emoji.character}</p>
							<p>{emoji.unicodeName}</p>
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
