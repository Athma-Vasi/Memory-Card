type EmojisArr = {
	slug: string
	character: string
	unicodeName: string
	codePoint: string
	group: string
	subGroup: string
	variants?: { slug: string; character: string }[]
}[]

type Emoji = {
	slug: string
	character: string
	unicodeName: string
	codePoint: string
	group: string
	subGroup: string
	variants?: { slug: string; character: string }[]
}

type State = {
	// subsetEmojis: EmojisArr
	allEmojis: EmojisArr | undefined
	clickedEmojis: Set<string>
	score: number
	highScore: number
	level: number
	isGameRunning?: boolean
	isDarkMode?: boolean
	isHardMode?: boolean
	themeState: ThemeState
}

type ThemeState = {
	colour: {
		light: string
		dark: string
	}
	backgroundColour: {
		light: string
		dark: string
	}
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
	toggleTheme: 'toggleTheme'
	toggleHardMode: 'toggleHardMode'
}

export { Emoji, EmojisArr, State, Dispatch, Action, ThemeState }
