describe('Carrinho', () => {

    beforeEach(() => {
        cy.session('login petz', () => {
            cy.visit('/' + 'checkout/login/indexLogado_loja')
            cy.get('#loginEmail').type(Cypress.env('emailLogin'))
            cy.get('#loginPassword').type(Cypress.env('passwordLogin'))
            cy.get('#loginEntrar').click()
        })
    });


    it('Adicionar item de cachorro no carrinho', () => {
        cy.visit('/')
        cy.get('#search').type('Cachorro{enter}')

        cy.url()
            .should('include', '/busca?q=Cachorro')

        cy.contains('Tapete Higiênico Petz para Cães Slim 30un').click({ force: true })

        cy.url()
            .should('include', '/produto/tapete-higienico-petz-para-caes-ultra-absorvente-slim-30un-')

        cy.get('#adicionarAoCarrinho').click()

        cy.url()
            .should('include', '/checkout/cart/')

        cy.get('#cart-item-149568 > .money')
            .should('contain', ' 79,99 ')
    });

    it(`Aumentar em 1 a quantidade do item 149568 no carrinho`, () => {
        cy.visit('/')

        cy.get('.icon-carrinho').click()

        //botão de aumentar
        cy.get(`#cart-item-149568 > .col.align-itcenter > :nth-child(1) > .b-numberinput > :nth-child(3) > .button > .icon > .mdi`)
            .click()

        cy.wait(1000)

        cy.get('.fn-wb > .tx-blue')
            .should('contain', '159,98')
    })

    it(`Diminuir em 1 a quantidade do item 149568 no carrinho`, () => {
        cy.visit('/')

        cy.get('.icon-carrinho').click()

        //botão de aumentar
        cy.get(`#cart-item-149568 > .col.align-itcenter > :nth-child(1) > .b-numberinput > :nth-child(1) > .button > .icon > .mdi`)
            .click()

        cy.wait(1000)

        cy.get('.fn-wb > .tx-blue')
            .should('contain', '79,99')

    })

    it(`Verificar valor final da compra`, () => {
        cy.visit('/')

        cy.get('.icon-carrinho').click()

        cy.get('.fn-wb > .tx-blue')
            .should('contain', '130,98')
    })

    it(`Remover item 149568 carrinho`, () => {
        cy.visit('/')

        cy.get('.icon-carrinho').click()

        cy.get(`#cart-item-149568 > .col.align-itcenter > .excluir`).click()

        cy.get('[class="button bg-green fn-s09"]').click()

        cy.contains('Tapete Higiênico Petz para Cães Slim 30un').should('not.exist')

        cy.get('.logo').click()
    })

    it.only('Conferir se o carrinho está vazio', () => {
        cy.visit('/')

        cy.get('.icon-carrinho').click()

        cy.contains('Seu carrinho está vazio').should('be.visible')
        
    });
});

/* 
,
  {
    "animal": "Pássaro",
    "produto": "Alimento Pássaro Petz Farinhada Mel e Ovos para Calopsita - 300g",
    "valor": "32,39",
    "codigo": "163384",
    "urlBusca": "P%C3%A1ssaro",
    "urlProduto": "alimento-passaro-petz-farinhada-mel-e-ovos-para-calopsita-300g"
  } */