import { EmojisArr, State, Dispatch } from './types'

function randomSliceOfEmojis(emojisArr: EmojisArr, level_ = 1): EmojisArr | undefined {
	let clone = structuredClone(emojisArr)

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
		let indexAmount = 6 * level_

		if (randomIndex + indexAmount < clone.length) {
			let randomIndexArr: number[] = []

			for (let i = randomIndex; i < randomIndex + indexAmount; i += 1) {
				randomIndexArr.push(i)
			}

			console.log(randomIndexArr)

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
