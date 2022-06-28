import './App.css'
import Wrapper from './components/styled-generics/Wrapper'

import AppHeader from './components/appHeader'
import ScoreBoard from './components/scoreBoard'
import GameBoard from './components/gameBoard'

import { EmojisArr, State, Dispatch, Action } from './types'

import { emojisData } from './emojisData'
import { useReducer } from 'react'

function randomSliceOfEmojis(emojisArr: EmojisArr): EmojisArr | undefined {
	const clone = structuredClone(emojisArr)

	if (!localStorage.getItem('uniqueRandomIndexes')) {
		localStorage.setItem('uniqueRandomIndexes', JSON.stringify([]))
	}

	const uniqueRandomIndexes = JSON.parse(
		localStorage.getItem('uniqueRandomIndexes') ?? ''
	)

	let isValidIndex = false

	while (!isValidIndex) {
		const randomIndex = Math.floor(Math.random() * clone.length)
		let isUnique = false
		if (randomIndex + 10 < clone.length) {
			let randomIndexArr = [
				randomIndex,
				randomIndex + 1,
				randomIndex + 2,
				randomIndex + 3,
				randomIndex + 4,
				randomIndex + 5,
				randomIndex + 6,
				randomIndex + 7,
				randomIndex + 8,
				randomIndex + 9,
			]

			randomIndexArr.forEach((randomIndex) => {
				if (!uniqueRandomIndexes.includes(randomIndex)) {
					isUnique = true
				} else {
					isUnique = false
					isValidIndex = false
				}
			})

			if (isUnique) {
				isValidIndex = true
				randomIndexArr.forEach((randomIndex) => {
					uniqueRandomIndexes.push(randomIndex)
					localStorage.setItem('uniqueRandomIndexes', JSON.stringify(uniqueRandomIndexes))
				})
			}

			return clone.slice(randomIndex, randomIndex + 10)
		} else {
			isValidIndex = false
		}
	}
}

console.log(randomSliceOfEmojis(emojisData))

const initialState: State = {
	subsetEmojis: emojisData.slice(0, 10),
	allEmojis: emojisData.slice(0, 10),
	clickedEmojis: new Set(),
	score: 0,
	highScore: JSON.parse(localStorage.getItem('highScore') ?? '0'),
	isGameRunning: true,
	isDarkMode: false,
}

const action: Action = {
	cardClick: 'cardClick',
}

const reducer = (state: State, action: Dispatch): State => {
	const clone = structuredClone(state)

	switch (action.type) {
		case 'cardClick': {
			clone.subsetEmojis = action.payload.subsetEmojis
			clone.allEmojis = action.payload.allEmojis
			clone.clickedEmojis = action.payload.clickedEmojis
			clone.score = action.payload.score
			clone.highScore = action.payload.highScore

			return clone
		}

		default: {
			return clone
		}
	}
}

function App() {
	const [state, dispatch] = useReducer(reducer, initialState)

	return (
		<Wrapper>
			<AppHeader state={state} dispatch={dispatch} action={action}></AppHeader>
			<ScoreBoard state={state} dispatch={dispatch} action={action}></ScoreBoard>
			<GameBoard state={state} dispatch={dispatch} action={action}></GameBoard>
		</Wrapper>
	)
}

export default App
