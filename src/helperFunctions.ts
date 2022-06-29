import { EmojisArr, State } from './types'

function randomSliceOfEmojis(emojisArr: EmojisArr, level_ = 1): EmojisArr {
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
		let indexAmount = 10 * level_

		if (randomIndex + indexAmount < clone.length) {
			// let randomIndexArr = [
			// 	randomIndex,
			// 	randomIndex + 1,
			// 	randomIndex + 2,
			// 	randomIndex + 3,
			// 	randomIndex + 4,
			// 	randomIndex + 5,
			// 	randomIndex + 6,
			// 	randomIndex + 7,
			// 	randomIndex + 8,
			// 	randomIndex + 9,
			// ]

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
				clone = clone.slice(randomIndex, randomIndex + 10)
			}
		} else {
			isValidIndex = false
		}
	}
	return clone
}

export { randomSliceOfEmojis }
