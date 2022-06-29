/*
interface EmojisArr {
	slug: string
	character: string
	unicodeName: string
	codePoint: string
	group: EmojisGroup
	subGroup: string
	variants?: EmojisVariant[]
}

// enum EmojisGroup {
// 	Activities = 'activities',
// 	AnimalsNature = 'animals-nature',
// 	Flags = 'flags',
// 	FoodDrink = 'food-drink',
// 	Objects = 'objects',
// 	PeopleBody = 'people-body',
// 	SmileysEmotion = 'smileys-emotion',
// 	Symbols = 'symbols',
// 	TravelPlaces = 'travel-places',
// }

type EmojisGroup =
	| 'activities'
	| 'animals-nature'
	| 'flags'
	| 'food-drink'
	| 'objects'
	| 'people-body'
	| 'smileys-emotion'
	| 'symbols'
	| 'travel-places'

interface EmojisVariant {
	slug: string
	character: string
}
*/

// type EmojisArr =
// 	| {
// 			slug: string
// 			character: string
// 			unicodeName: string
// 			codePoint: string
// 			group: string
// 			subGroup: string
// 	  }
// 	| {
// 			slug: string
// 			character: string
// 			unicodeName: string
// 			codePoint: string
// 			group: string
// 			subGroup: string
// 			variants: { slug: string; character: string }[]
// 	  }[]

type EmojisArr = {
	slug: string
	character: string
	unicodeName: string
	codePoint: string
	group: string
	subGroup: string
	variants?: { slug: string; character: string }[]
}[]

type State = {
	// subsetEmojis: EmojisArr
	allEmojis: EmojisArr | undefined
	clickedEmojis: Set<string>
	score: number
	highScore: number
	level: number
	isGameRunning?: boolean
	isDarkMode?: boolean
}

type Dispatch = {
	type: string
	payload: Partial<State>
}

type Action = {
	cardClick: 'cardClick'
	updateAllEmojis: 'updateAllEmojis'
	updateClickedEmojis: 'updateClickedEmojis'
	updateScore: 'updateScore'
	updateLevel: 'updateLevel'
	updateHighScore: 'updateHighScore'
	toggleIsGameRunning: 'toggleIsGameRunning'
	toggleIsDarkMode: 'toggleIsDarkMode'
}

export { EmojisArr, State, Dispatch, Action }
