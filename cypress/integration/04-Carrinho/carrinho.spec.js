describe('Carrinho', () => {

    beforeEach(() => {
        cy.session('login petz', () => {
            cy.visit('/' + 'checkout/login/indexLogado_loja')
            cy.get('#loginEmail').type(Cypress.env('emailLogin'))
            cy.get('#loginPassword').type(Cypress.env('passwordLogin'))
            cy.get('#loginEntrar').click()
        })
    });

    const data = require('../../fixtures/data')

    data.forEach((item) => {
        it(`Adicionar item ${item.codigo} no carrinho e conferir o preço`, () => {
            cy.visit('/')

            cy.get('#search').type(item.animal + '{enter}')

            cy.url()
                .should('include', '/busca?q=' + item.urlBusca)

            cy.contains(item.produto).click({ force: true })

            cy.url()
                .should('include', '/produto/' + item.urlProduto)

            cy.get('#adicionarAoCarrinho').click()

            cy.url()
                .should('include', '/checkout/cart/')

            cy.get(`#cart-item-${item.codigo} > .money`)
                .should('contain', item.valor)

            cy.get('.logo').click()
        });
    })

    data.forEach((item) => {
        it(`Aumentar em 1 a quantidade do item ${item.codigo} no carrinho`, () => {
            cy.visit('/')

            cy.get('.icon-carrinho').click()

            //botão de aumentar
            cy.get(`#cart-item-${item.codigo} > .col.align-itcenter > :nth-child(1) > .b-numberinput > :nth-child(3) > .button > .icon > .mdi`)
                .click()
        })
    })

    data.forEach((item) => {
        it(`Diminuir em 1 a quantidade do item ${item.codigo} no carrinho`, () => {
            cy.visit('/')

            cy.get('.icon-carrinho').click()

            //botão de aumentar
            cy.get(`#cart-item-${item.codigo} > .col.align-itcenter > :nth-child(1) > .b-numberinput > :nth-child(1) > .button > .icon > .mdi`)
                .click()
        })
    })

    it(`Verificar valor final da compra`, () => {
        cy.visit('/')

        cy.get('.icon-carrinho').click()

        cy.get('.fn-wb > .tx-blue')
            .should('contain', '163,37')
    })


    data.forEach((item) => {
        it(`Remover item ${item.codigo} carrinho`, () => {
            cy.visit('/')

            cy.get('.icon-carrinho').click()

            cy.get(`#cart-item-${item.codigo} > .col.align-itcenter > .excluir`).click()

            cy.get('[class="button bg-green fn-s09"]').click()

            cy.contains(item.produto).should('not.exist')

            cy.get('.logo').click()
        })
    })

    it('Conferir se o carrinho está vazio', () => {
        cy.visit('/')

        cy.get('.icon-carrinho').click()

        cy.contains('Seu carrinho está vazio').should('be.visible')
        
    });

});