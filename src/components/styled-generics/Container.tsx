import styled from 'styled-components'

const Container = styled.div`
	// padding-left: auto;
	// padding-right: auto;
	padding-left: 2rem;
	padding-right: 2rem;
	padding-top: max(7vh, 2rem);
	padding-bottom: max(7vh, 2rem);

	width: 100%;

	// display: grid;
	// align-content: center;
	// justify-items: center;
	// gap: 1rem;
	// grid-template-columns: repeat(auto-fit, minmax(40ch, 1fr));

	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	gap: 1rem;

	transition: 146ms all ease-in-out;

	outline: 1px solid green;
`

export default Container
