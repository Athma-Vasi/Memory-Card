import Container from '../styled-generics/Container'
import Card from '../styled-generics/Card'

import { emojisData } from '../../emojisData'

import { EmojisArr, State, Dispatch, Action } from '../../types'

import { randomSliceOfEmojis } from '../../helperFunctions'
import Button from '../styled-generics/Button'

function GameBoard({
	state,
	dispatch,
	action,
}: {
	state: State
	dispatch: React.Dispatch<Dispatch>
	action: Action
}): JSX.Element {
	function handleCardClick(ev: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
		const amountOfCards = state.level * 4

		//if size of the emojis set is one less than amount of cards displayed,
		//then increase the level
		if (state.clickedEmojis.size === amountOfCards - 1) {
			console.log('dispatching')

			//first updating everything except allEmojis because its value is set to the
			//return value of the randomSliceOfEmojis function which takes updated level
			dispatch({
				type: action.cardClick,
				payload: {
					allEmojis: state.allEmojis,
					clickedEmojis: new Set(),
					score: (state.score += 1),
					level: (state.level += 1),
					highScore: state.highScore,
				},
			})

			//uppdating allEmojis with the updated level value
			dispatch({
				type: action.updateAllEmojis,
				payload: {
					allEmojis: randomSliceOfEmojis(emojisData, state.level),
				},
			})
		}
		//player has not lost and level is not increased
		else {
			//shuffle the displayed array of emojis
			const shuffledArray = (function (arr: EmojisArr | undefined): EmojisArr {
				let clone = structuredClone(arr)

				for (let i = clone.length - 1; i > 0; i -= 1) {
					const j = Math.floor(Math.random() * (i + 1))
					;[clone[i], clone[j]] = [clone[j], clone[i]]
				}

				return clone
			})(state.allEmojis)

			const emoji = ev.currentTarget.dataset.emoji ?? ''

			//if the clicked emoji is not in the set of clicked emojis, update state
			if (!state.clickedEmojis.has(emoji)) {
				dispatch({
					type: action.cardClick,
					payload: {
						allEmojis: shuffledArray,
						clickedEmojis: state.clickedEmojis.add(emoji),
						score: (state.score += 1),
						level: state.level,
						highScore: state.highScore,
					},
				})
			}
			//player has lost by clicking on the same emoji twice
			//store score if it is highScore, reset displayed emojis to level one,
			//reset score, reset clicked emojis, clear uniqueRandomIndexes in localstorage,
			//and update state
			else {
				storeHighScore(state.score)

				dispatch({
					type: action.cardClick,
					payload: {
						allEmojis: randomSliceOfEmojis(emojisData),
						clickedEmojis: new Set(),
						score: (state.score = 0),
						level: state.level,
						highScore: state.highScore,
					},
				})

				localStorage.setItem('uniqueRandomIndexes', JSON.stringify([]))
				//game over function
				console.warn('game over')

				dispatch({
					type: action.toggleIsGameRunning,
					payload: {
						isGameRunning: false,
					},
				})
			}
		}
	}

	function storeHighScore(score_: number): void {
		if (!localStorage.getItem('highScore')) {
			localStorage.setItem('highScore', JSON.stringify(score_))
		}

		const storageHighScore: number = JSON.parse(localStorage.getItem('highScore') ?? '0')

		if (score_ > storageHighScore) {
			localStorage.setItem('highScore', JSON.stringify(score_))

			dispatch({
				type: action.updateHighScore,
				payload: {
					highScore: score_,
				},
			})
		}
	}

	function handlePlayAgainBttnClick(
		ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
	): void {
		dispatch({
			type: action.toggleIsGameRunning,
			payload: {
				isGameRunning: true,
			},
		})
	}

	return (
		<>
			<Container>
				{!state.isGameRunning && (
					<Button onClick={handlePlayAgainBttnClick}>Play again!</Button>
				)}
				{state.isGameRunning &&
					state.allEmojis?.map((emoji, index) => (
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
