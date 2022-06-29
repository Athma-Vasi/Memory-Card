import styled from 'styled-components'

type ContainerProps = {
	colour?: string
	backgroundColour?: string
}

const Container = styled.div<ContainerProps>`
	// padding-left: auto;
	// padding-right: auto;
	padding-left: 2rem;
	padding-right: 2rem;
	padding-top: max(7vh, 2rem);
	padding-bottom: max(7vh, 2rem);

	width: 100%;

	color: ${({ colour }) => (colour ? colour : 'hsl(180, 100%, 25%)')};
	background-color: ${({ backgroundColour }) =>
		backgroundColour ? backgroundColour : 'white'};

	// display: grid;
	// align-content: center;
	// justify-items: center;
	// gap: 2rem;
	// grid-template-columns: repeat(auto-fit, minmax(40ch, 1fr));

	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
	align-items: center;
	gap: 2rem;

	transition: 146ms all ease-in-out;
`

export default Container
