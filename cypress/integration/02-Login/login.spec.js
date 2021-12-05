describe('Carrinho', () => {
    beforeEach(() => {
        cy.session('login petz', () => {
            cy.visit('https://www.petz.com.br/checkout/login/indexLogado_Loja')
            cy.get('#loginEmail').type('lcsestudoslcs@gmail.com')
            cy.get('#loginPassword').type('Kamiza10')
            cy.get('#loginEntrar').click()
        })
    });

    it('Login de tal jeito', () => {

    });

})