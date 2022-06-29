import styled from 'styled-components'

type PropsButton = {
	colour?: string
	backgroundColour?: string
}

const Button = styled.button<PropsButton>`
	color: ${({ colour }) => (colour ? colour : 'hsl(180, 100%, 25%)')};
	background-color: ${({ backgroundColour }) =>
		backgroundColour ? backgroundColour : 'white'};
	font-family: inherit;
	cursor: pointer;

	padding: 0.25em 0.75em;
	min-width: 10ch;
	min-height: 3em;
	line-height: 1.1;

	border: 1px solid ${({ colour }) => (colour ? colour : 'hsl(180, 100%, 25%)')};
	border-radius: 8px;

	// box-shadow: 2px 4px 4px hsl(0, 0%, 0%, 0.8),

	display: inline-flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	align-self: start;

	transition: 146ms all ease-in-out;

	&:hover,
	&:active {
		color: ${({ backgroundColour }) => (backgroundColour ? backgroundColour : 'white')};
		background-color: ${({ colour }) => (colour ? colour : 'hsl(180, 100%, 25%)')};
		box-shadow: 2px 4px 4px hsl(0, 0%, 0%, 0.4), 3px 6px 6px hsl(0, 0%, 0%, 0.3),
			4px 8px 8px hsl(0, 0%, 0%, 0.2), 5px 10px 10px hsl(0, 0%, 0%, 0.1);
		transform: scale(1.0382);
	}

	&:focus {
		outline-style: solid;
		outline-color: transparent;
		box-shadow: 1px 2px 2px ${({ colour }) => (colour ? colour : 'hsl(180, 100%, 25%)')};
	}

	@media screen and (-ms-high-contrast: active) {
		border: 2px solid currentColor;
	}
`

export default Button
