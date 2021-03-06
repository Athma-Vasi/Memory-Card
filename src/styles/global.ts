import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
html {
  margin: 0;
  padding: 0;
  outline: 0;
  font-size: 62.5%;
  
  box-sizing: border-box;
}

*, *::before, *::after {
box-sizing: inherit;
}

body {
	display: grid;
	place-content: center;
  font-size: 1.6rem;
  width: 100%;
}

a{
  text-decoration: none;
  color: inherit;
}
`

export { GlobalStyle }
