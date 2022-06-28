import styled from 'styled-components'

type PropsTextarea = {
	colour?: string
	backgroundColour?: string
}

const Textarea = styled.textarea<PropsTextarea>`
	font-size: 16px;
	font-size: max(16px, 1em);
	font-family: inherit;
	width: 100%;
	resize: none;

	padding: 0.25em 0.5em;
	color: ${({ colour }) => (colour ? colour : 'hsl(180, 100%, 25%)')};
	background-color: ${({ backgroundColour }) =>
		backgroundColour ? backgroundColour : 'white'};

	border: 2px solid ${({ colour }) => (colour ? colour : 'hsl(180, 100%, 25%)')};
	border-radius: 4px;

	transition: 246ms all ease-in-out;

	&:focus {
		box-shadow: 0px 0px 0px 2px
			${({ colour }) => (colour ? colour : 'hsl(180, 100%, 25%)')};
		outline: 2px solid transparent;
	}
`

export default Textarea
