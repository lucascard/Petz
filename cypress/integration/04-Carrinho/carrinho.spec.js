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
        it(`Adicionar item ${item.codigo} no carrinho`, () => {
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

    it(`Finalizando a compra`, () => {
        cy.visit('/')

        cy.get('.icon-carrinho').click()

        cy.get("body", { log: false }).then($body => {
            if ($body.find('[class="button link fn-s08"]').length > 0) {

            } else {
                cy.get('#cepSearch').type('72320104')
            }
        })

        cy.get('#pickup').click()

        cy.contains(' Retire na loja ')
            .should('be.visible')

        cy.contains(' Candangolândia- Brasília- DF ').click()

        cy.contains('Retire nesta loja').click()

        cy.get('.shipping-chosed-information')
            .should('be.visible')



        cy.get('#cartButtonConfirm').click()

        cy.get("body", { log: false }).then($body => {
            if ($body.find('[class="footer"]').length > 0) {

                cy.get('[class="button bg-green fn-s09"]').click()

                cy.get('[name="name"]').type('casa')

                cy.contains('Número').next().type('21')

                cy.get('[name="addressLine1"]').type('Rua dos bobos')

                cy.get('[name="district"]').type('Centro')

                cy.get('name="city"').type('Brasília')

                cy.get('[name="state"]').select(' DF ')

                cy.get('[class="button bg-green"]').click()
            }
        })

        cy.url()
            .should('include', 'https://www.petz.com.br/checkout/checkout/')
    })

    it(`Verificar valor final da compra`, () => {
        cy.visit('/')

        cy.get('.icon-carrinho').click()

        cy.get('.fn-wb > .tx-blue')
            .should('contain', '124,43')
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