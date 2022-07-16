import { mount } from 'cypress/react'
import App from './App'

describe('App', () => {
	it('mounts', () => {
		mount(<App />)
	})

	it('should default Score to 0', () => {
		mount(<App />)
		cy.get('[data-cy="score"]').should('have.text', 'Score: 0')
	})

	it('should default Highscore to 0 on first visit', () => {
		mount(<App />)
		cy.get('[data-cy="highscore"]').should('have.text', 'Highscore: 0')
	})

	it('should display ☀️ as default', () => {
		mount(<App />)
		cy.get('[data-cy="bttn-toggleTheme"]').should('have.text', '☀️')
	})

	it('should display 🌑 & ☀️ when toggled', () => {
		mount(<App />)
		cy.get('[data-cy="bttn-toggleTheme"]').click()
		cy.get('[data-cy="bttn-toggleTheme"]').should('have.text', '🌑')

		cy.get('[data-cy="bttn-toggleTheme"]').click()
		cy.get('[data-cy="bttn-toggleTheme"]').should('have.text', '☀️')
	})

	it('should increment score when a new card is clicked', () => {
		mount(<App />)
		cy.get('[data-cy="emoji-card"]').first().click()
		cy.get('[data-cy="score"]').should('have.text', 'Score: 1')
	})

	it('should remove card text when hard mode button is clicked', () => {
		mount(<App />)
		cy.get('[data-cy="bttn-hardMode"]').click()
		cy.get('[data-cy="emoji-card"]').first().should('not.have.text')
	})

	it('should display game loss text when card is clicked more than once and return to homepage', () => {
		mount(<App />)
		cy.get('[data-cy="emoji-card"]').first().click()
		cy.get('[data-cy="game-lossText"]').should(
			'have.text',
			"Wow! 🤩 That's a great score! Try to beat your best! ✺◟(＾∇＾)◞✺"
		)
		cy.get('[data-cy="bttn-playAgain"]').first().click()
		cy.get('[data-cy="score"]').should('have.text', 'Score: 0')
	})
})
