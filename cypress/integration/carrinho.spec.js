describe('Carrinho', () => {
    beforeEach(() => {
      cy.session( 'login petz', () => {
        cy.visit('https://www.petz.com.br/checkout/login/indexLogado_Loja')
        cy.get('#loginEmail').type('lcsestudoslcs@gmail.com')
        cy.get('#loginPassword').type('Kamiza10')
        cy.get('#loginEntrar').click()
      })
    });
   
    it('Entrando no carrinho', () => {
        cy.visit('/')
        cy.get('.icon-carrinho').click() 
        cy.contains('Seu carrinho está vazio').should('be.visible')
        
    });
    
    const data = require ('../fixtures/data')

    data.forEach((item) => { 
        it(`Pesquisar e adicionar um item ${item.animal} no carrinho`, () => {
            cy.visit('/')
            cy.get('#search').type(item.animal)
            cy.get('#search').type('{enter}')
            cy.contains(item.produto).should('be.visible').parent().find('[itemprop="image"]').click()
            //dentro da página do item
            cy.get('#adicionarAoCarrinho').click()
                    
        });
    })

    
    it.only('Verificar se o valor do item no carrinho está correto', () => {
        cy.visit('/')
        cy.get('.icon-carrinho').click()
        cy.contains('Areia para Gatos Petz Sílica Cristal 1,6kg').parents().parents().children().find('50,99').should('be.visible')
    });
});