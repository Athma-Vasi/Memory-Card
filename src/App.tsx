import './App.css'
import Wrapper from './components/styled-generics/Wrapper'
import Container from './components/styled-generics/Container'

import AppHeader from './components/appHeader'
import ScoreBoard from './components/scoreBoard'
import GameBoard from './components/gameBoard'

function App() {
	return (
		<Wrapper>
			<AppHeader></AppHeader>
			<ScoreBoard></ScoreBoard>
			<GameBoard></GameBoard>
		</Wrapper>
	)
}

export default App
