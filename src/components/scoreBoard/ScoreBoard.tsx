import { Header } from '../styled-generics/Header'
import { State, Dispatch, Action } from '../../types'

function ScoreBoard({
	state,
	dispatch,
	action,
}: {
	state: State
	dispatch: React.Dispatch<Dispatch>
	action: Action
}): JSX.Element {
	return (
		<>
			<Header>
				<h3>Score: {state.score}</h3>
				<h3>Highscore: {state.highScore}</h3>
			</Header>
		</>
	)
}

export default ScoreBoard
