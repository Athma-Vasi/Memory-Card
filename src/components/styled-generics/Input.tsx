import styled from 'styled-components';

type PropsInput = {
  colour?: string;
  backgroundColour?: string;
};

const Input = styled.input<PropsInput>`
  font-size: 16px;
  font-size: max(16px, 1em);
  font-family: inherit;
  width: 100%;

  padding: 0.25em 0.5em;

  color: ${({ colour }) => (colour ? colour : 'hsl(180, 100%, 25%)')};
  background-color: ${({ backgroundColour }) =>
    backgroundColour ? backgroundColour : 'white'};

  border: 2px solid ${({ colour }) => (colour ? colour : 'hsl(180, 100%, 25%)')};
  border-radius: 4px;

  transition: 146ms all ease-in-out;

  &:not(textarea) {
    line-height: 1;
    height: 2.25rem;
  }

  &[type='file'] {
    font-size: 0.9em;
    padding-top: 0.35rem;
  }

  &[readonly] {
    border-style: dotted;
    cursor: not-allowed;
    color: hsl(0, 0%, 47%);
  }

  &[disabled] {
    background-color: hsl(0, 0%, 93%);
    cursor: not-allowed;
  }

  &:focus {
    box-shadow: 0px 0px 0px 2px
      ${({ colour }) => (colour ? colour : 'hsl(180, 100%, 25%)')};
    outline: 2px solid transparent;
  }
`;
export default Input;
