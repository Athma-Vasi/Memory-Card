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

	/*
	
	//if not present, create new storage key
	if (!localStorage.getItem('uniqueRandomIndexes')) {
		localStorage.setItem('uniqueRandomIndexes', JSON.stringify([]))
	}

	const uniqueRandomIndexes: number[] = JSON.parse(
		localStorage.getItem('uniqueRandomIndexes') ?? ''
	)

	//while isValidIndex is false, keeps generating random indexes and checks that
	//randomIndex plus indexAmount is less than the length of the emojis array
	//and checks that the randomIndex is not present in the uniqueRandomIndexes array
	//each indexAmount is six times the current level
	//will create a slice of unique emojis upon each invokation
	let isValidIndex = false
	
	while (!isValidIndex) {
		const randomIndex = Math.floor(Math.random() * clone.length)
		let isUnique = false
		let indexAmount = 6 * level_

		if (randomIndex + indexAmount < clone.length) {
			let randomIndexArr: number[] = []

			for (let i = randomIndex; i < randomIndex + indexAmount; i += 1) {
				randomIndexArr.push(i)
			}

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
				clone = clone.slice(randomIndex, randomIndex + indexAmount)
				return clone
			}
		} else {
			isValidIndex = false
		}
	}
	*/
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
