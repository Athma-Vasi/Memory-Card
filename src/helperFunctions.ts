import { EmojisArr, State, Dispatch } from './types'

function randomSliceOfEmojis(emojisArr: EmojisArr, level_ = 1): EmojisArr | undefined {
	//deep copy of the emojis array
	let clone: EmojisArr = structuredClone(emojisArr)

	const shuffledArray = (function (arr: EmojisArr): EmojisArr {
		for (let i = arr.length - 1; i > 0; i -= 1) {
			const j = Math.floor(Math.random() * (i + 1))
			;[arr[i], arr[j]] = [arr[j], arr[i]]
		}

		return arr
	})(clone)

	if (level_ * 6 >= clone.length) {
		alert(`😮😧😰😨😱😲😯😦😕😥😫🙁😟😞😔
		You are a savant! You have reached the end of the game. 
		`)

		window.location.reload()
		return undefined
	}

	return shuffledArray.slice(0, level_ * 6)
}

const reducer = (state: State, action: Dispatch): State => {
	//deep copy of state
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
		//some are unnecessary but are included for completeness and to ease future refactors
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
		case 'toggleHardMode': {
			clone.isHardMode = action.payload.isHardMode
			return clone
		}

		default: {
			return clone
		}
	}
}

export { randomSliceOfEmojis, reducer }
