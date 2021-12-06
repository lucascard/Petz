describe('Página das marcas em destaque', () => {
    beforeEach(() => {
        cy.session('login petz', () => {
            cy.visit('https://www.petz.com.br/checkout/login/indexLogado_Loja')
            cy.get('#loginEmail').type('lcsestudoslcs@gmail.com')
            cy.get('#loginPassword').type('123')
            cy.get('#loginEntrar').click()
        })
    });

    const marcasDestaque = require('../../fixtures/marcasDestaque')
    marcasDestaque.forEach((m) => {
        it(`Produtos da marca ${m.marca}`, () => {
            cy.visit('/')
            cy.get('[class="marcas"]').find(m.link).click()
            cy.contains(`produtos da marca ${m.marca}`).should('be.visible')
            cy.url()
                .should('eq', m.url)
        });
    })

    /* it.only('teste', () => {
        cy.visit('/')

        cy.get('[class="marcas"]').find('[href="/bayerpet"]').click()
        cy.contains('produtos da marca Bayer Pet').should('be.visible')
        cy.url()
            .should('eq', 'https://www.petz.com.br/bayerpet')


    }); */

});