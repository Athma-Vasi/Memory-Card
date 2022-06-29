import './App.css'
import Wrapper from './components/styled-generics/Wrapper'

import AppHeader from './components/appHeader'
import ScoreBoard from './components/scoreBoard'
import GameBoard from './components/gameBoard'

import { ThemeState, State, Dispatch, Action } from './types'
import { randomSliceOfEmojis } from './helperFunctions'

import { emojisData } from './emojisData'
import { useReducer } from 'react'

const themeState: ThemeState = {
	colour: {
		light: 'hsl(0, 0%, 25%)',
		dark: 'hsl(0, 0%, 75%)',
	},
	backgroundColour: {
		light: 'hsl(0, 0%, 97%)',
		dark: 'hsl(0, 0%, 11%)',
	},
}

const initialState: State = {
	allEmojis: randomSliceOfEmojis(emojisData),
	clickedEmojis: new Set(),
	score: 0,
	level: 1,
	highScore: JSON.parse(localStorage.getItem('highScore') ?? '0'),
	isGameRunning: true,
	isDarkMode: false,
	themeState: themeState,
}

const action: Action = {
	cardClick: 'cardClick',
	updateAllEmojis: 'updateAllEmojis',
	updateClickedEmojis: 'updateClickedEmojis',
	updateScore: 'updateScore',
	updateLevel: 'updateLevel',
	updateHighScore: 'updateHighScore',
	toggleIsGameRunning: 'toggleIsGameRunning',
	toggleTheme: 'toggleTheme',
}

const reducer = (state: State, action: Dispatch): State => {
	const clone = structuredClone(state)

	switch (action.type) {
		case 'cardClick': {
			//updates everything because the dispatch function has multiple payloads sometimes
			clone.allEmojis = action.payload.allEmojis
			clone.clickedEmojis = action.payload.clickedEmojis
			clone.score = action.payload.score
			clone.level = action.payload.level
			clone.highScore = action.payload.highScore

			return clone
		}
		//updates each case individually
		case 'updateAllEmojis': {
			clone.allEmojis = action.payload.allEmojis
			return clone
		}
		case 'updateClickedEmojis': {
			clone.clickedEmojis = action.payload.clickedEmojis
			return clone
		}
		case 'updateScore': {
			clone.score = action.payload.score
			return clone
		}
		case 'updateLevel': {
			clone.level = action.payload.level
			return clone
		}
		case 'updateHighScore': {
			clone.highScore = action.payload.highScore
			return clone
		}
		case 'toggleIsGameRunning': {
			clone.isGameRunning = action.payload.isGameRunning
			return clone
		}
		case 'toggleTheme': {
			clone.isDarkMode = action.payload.isDarkMode
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
		<Wrapper
			colour={
				state.isDarkMode ? state.themeState.colour.dark : state.themeState.colour.light
			}
			backgroundColour={
				state.isDarkMode
					? state.themeState.backgroundColour.dark
					: state.themeState.backgroundColour.light
			}
		>
			<AppHeader state={state} dispatch={dispatch} action={action}></AppHeader>
			<ScoreBoard state={state} dispatch={dispatch} action={action}></ScoreBoard>
			<GameBoard state={state} dispatch={dispatch} action={action}></GameBoard>
		</Wrapper>
	)
}

export default App
