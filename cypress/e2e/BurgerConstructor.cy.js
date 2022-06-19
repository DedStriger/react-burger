import '@4tw/cypress-drag-drop'

describe('should burger constructor work', () => {
    before(() => { 
        cy.visit('http://localhost:3000/')
    })
    it('burger ingredient modal work!', () => {
        cy.get('[class^=BurgerIngredients_item__]').first().click()
        cy.get('[class^=ModalOverlay_overlay__]').should('be.visible')
        cy.get('[class^=Modal_close__]').first().click()
        cy.get('[class^=ModalOverlay_overlay__]').should('not.exist')
    })

    it('drag and drop burger ingredients', () => {
        cy.get('[class^=BurgerIngredients_item__]').first().drag('[class^=BurgerConstructor_element]')
        cy.get('.constructor-element').first().should('exist').contains('Краторная булка N-200i')
    })

    it('should request oreder', () => {
        cy.get('[class^=BurgerConstructor_footer__] button').click()
        cy.get('.input_type_email input').type('nikita-prokuratov@mail.ru')
        cy.get('.input_type_password input').type('12')
        cy.get('button').click()
        cy.wait(5000)
            cy.get('[class^=AppHeaderButton_container__]').first().click()
            cy.get('[class^=BurgerConstructor_footer__] button').click()
            cy.wait(20000)
                cy.get('[class^=ModalOverlay_overlay__]').should('be.visible').contains('идентификатор заказа')
    })
})