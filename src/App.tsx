import './App.css'
import Wrapper from './components/styled-generics/Wrapper'

import AppHeader from './components/appHeader'
import ScoreBoard from './components/scoreBoard'
import GameBoard from './components/gameBoard'

import { EmojisArr, State, Dispatch, Action } from './types'
import { randomSliceOfEmojis } from './helperFunctions'

import { emojisData } from './emojisData'
import { useReducer } from 'react'

const initialState: State = {
	// subsetEmojis: randomSliceOfEmojis(emojisData),
	allEmojis: randomSliceOfEmojis(emojisData),
	clickedEmojis: new Set(),
	score: 0,
	level: 1,
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
			// clone.subsetEmojis = action.payload.subsetEmojis
			clone.allEmojis = action.payload.allEmojis
			clone.clickedEmojis = action.payload.clickedEmojis
			clone.score = action.payload.score
			clone.level = action.payload.level
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
