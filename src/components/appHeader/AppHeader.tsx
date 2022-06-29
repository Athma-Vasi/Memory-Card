import Container from '../styled-generics/Container'
import Button from '../styled-generics/Button'
import { Header } from '../styled-generics/Header'
import { Action, Dispatch, State } from '../../types'

export default function AppHeader({
	state,
	dispatch,
	action,
}: {
	state: State
	dispatch: React.Dispatch<Dispatch>
	action: Action
}): JSX.Element {
	function handleToggleThemeClick(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		ev.currentTarget.textContent = ev.currentTarget.textContent === '🌑' ? '☀️' : '🌑'

		dispatch({
			type: action.toggleTheme,
			payload: {
				isDarkMode: ev.currentTarget.textContent === '🌑' ? true : false,
			},
		})
	}
	return (
		<>
			<Header>
				<h1>Emoji Card</h1>
				<Header>
					<a href="https://github.com/Athma-Vasi" className="link">
						Made by Athma Vasi
					</a>
					<a href="" className="link">
						View code
					</a>
				</Header>
			</Header>
			<Button
				colour={
					state.isDarkMode ? state.themeState.colour.dark : state.themeState.colour.light
				}
				backgroundColour={
					state.isDarkMode
						? state.themeState.backgroundColour.dark
						: state.themeState.backgroundColour.light
				}
				style={{
					clipPath: 'circle()',
					fontSize: '2rem',
					border: 'none',
					outline: 'none',
					minWidth: '2rem',
					minHeight: '2rem',
					marginTop: '-1.5rem',
					marginRight: '1rem',
					paddingTop: '1rem',
				}}
				type="button"
				onClick={handleToggleThemeClick}
			>
				☀️
			</Button>
			<Header>
				<h3>Click on a card and don't click on any more than once!</h3>
			</Header>
		</>
	)
}
