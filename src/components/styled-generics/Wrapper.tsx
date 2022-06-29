import styled from 'styled-components'

type WrapperProps = {
	colour?: string
	backgroundColour?: string
}

const Wrapper = styled.div<WrapperProps>`
	// padding-left: auto;
	// padding-right: auto;

	color: ${({ colour }) => (colour ? colour : 'hsl(180, 100%, 25%)')};
	background-color: ${({ backgroundColour }) =>
		backgroundColour ? backgroundColour : 'white'};

	// width: clamp(16rem, 90vw, 70rem);
	// min-width: 100ch;
	// width: 90vw;
	// max-width: 70rem;

	// width: calc(100% - 2rem);
	// height: 100vh;

	@media only screen and (max-width: 600px) {
		width: calc(100% - 2rem);
	}

	@media only screen and (max-width: 960px) {
		width: 93ch;
	}

	@media only screen and (min-width: 1200px) {
		width: 190ch;
	}

	transition: 146ms all ease-in-out;
`

export default Wrapper
