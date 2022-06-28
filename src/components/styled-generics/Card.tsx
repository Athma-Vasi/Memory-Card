import styled from 'styled-components'

type CardProps = {
	colour?: string
	backgroundColour?: string
}

const Card = styled.div<CardProps>`
	// padding-left: auto;
	// padding-right: auto;
	// padding-top: 0.5rem;
	// padding-bottom: 0.5rem;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	height: 15rem;

	transition: 146ms all ease-in-out;

	color: ${({ colour }) => (colour ? colour : 'hsl(180, 100%, 25%)')};
	background-color: ${({ backgroundColour }) =>
		backgroundColour ? backgroundColour : 'white'};

	// width: min(40ch, 100% - 2rem);

	width: clamp(15ch, 35ch, 60ch);

	&:hover {
		cursor: pointer;
	}

	outline: 1px solid orange;
`

export default Card
