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
				<h1
					style={{
						width: 'clamp(15ch, 35ch, 60ch)',
						fontSize: '4rem',
					}}
				>
					Memoji Card
				</h1>
				<Header
					style={{
						justifyContent: 'space-around',
						paddingLeft: '5rem',
						paddingRight: '5rem',
					}}
				>
					<a href="https://github.com/Athma-Vasi" className="link">
						Made by Athma Vasi
					</a>
					<a href="https://github.com/Athma-Vasi/Memory-Card" className="link">
						View code
					</a>
				</Header>
				<Button
					colour={
						state.isDarkMode
							? state.themeState.colour.dark
							: state.themeState.colour.light
					}
					backgroundColour={
						state.isDarkMode
							? state.themeState.backgroundColour.dark
							: state.themeState.backgroundColour.light
					}
					style={{
						clipPath: 'circle()',
						// fontSize: '2rem',
						transform: 'scale(2)',
						border: 'none',
						outline: 'none',
						minWidth: '2rem',
						minHeight: '2rem',
						marginTop: '4.5rem',
						marginLeft: '2rem',
						marginRight: '1rem',
					}}
					type="button"
					onClick={handleToggleThemeClick}
				>
					☀️
				</Button>
			</Header>
			<Header>
				<h3>Click on a card and don't click on any more than once!</h3>
			</Header>
		</>
	)
}
