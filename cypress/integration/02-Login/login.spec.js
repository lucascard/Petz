describe('Tela de login', () => {
    beforeEach(() => {
        cy.visit('/' + 'checkout/login/indexLogado_Loja')
    })

    it('Ir para tela de registro', () => {

        cy.get('#loginCriarConta').click()

        cy.url()
            .should('eq', 'https://www.petz.com.br/checkout/cadastro/indexLogado_Loja')
    });

    it('Entrar sem preencher nada', () => {

        cy.get('#loginEntrar').click()

        cy.get(':nth-child(2) > .field').contains('Campo obrigatório.')
            .should('be.visible')

        cy.get('.login-client > :nth-child(3)').contains('Campo obrigatório.')
            .should('be.visible')
    });

    it('Login com senha incorreta', () => {

        cy.get('#loginEmail').type('teste@gmail.com')
        cy.get('#loginPassword').type('213123')
        cy.get('#loginEntrar').click()

        cy.contains('Dados incorretos!')
            .should('be.visible')
    });

    it('Visualizar senha', () => {

        cy.get('#loginPassword').type('213123')
        cy.get('.mdi').click()

        cy.get('#loginPassword').should('have.attr', 'type', 'text')
    });

    it('Esqueci a senha', () => {

        cy.get('.remember > .button').click()

        cy.get('.title').contains('Esqueci minha senha')
            .should('be.visible')

        cy.get('[class="button bg-green fn-s12 m-t-1"]')
            .should('not.be.enabled')

        cy.get('[id="cpf"]').type('917.701.640-81')
        cy.get('[class="button bg-green fn-s12 m-t-1"]')
            .should('be.enabled')

    });

    it('Recuperar senha com CPF não cadastrado', () => {

        cy.get('.remember > .button').click()

        cy.get('[id="cpf"]').type('917.701.640-81')
        cy.get('[class="button bg-green fn-s12 m-t-1"]').click()

        cy.contains('Cliente não encontrado.')
            .should('be.visible')
    });

    it('Recuperar senha com CNPJ não cadastrado', () => {

        cy.get('.remember > .button').click()

        cy.get('[id="cpf"]').type('11.111.111/1111-11')
        cy.get('[class="button bg-green fn-s12 m-t-1"]').click()

        cy.contains('CNPJ inválido').should('be.visible')
    });

    const serverID = 'vgurqsmy'
    const serverDomain = 'vgurqsmy.mailosaur.net'
    const emailAddress = 'password@' + serverDomain
    it('Recuperar senha com CPF cadastrado', () => {

        cy.get('.remember > .button').click()

        cy.get('[id="cpf"]').type('36578209816')
        cy.get('[class="button bg-green fn-s12 m-t-1"]').click()

        cy.contains('Quero receber código por : ')
            .should('be.visible')

        cy.get('[class="button bg-green fn-s12 m-t-04"]')
            .should('not.be.enabled')

        cy.contains('E-mail').click()

        cy.get('[class="button bg-green fn-s12 m-t-04"]')
            .should('be.enabled')
        cy.get('[class="button bg-green fn-s12 m-t-04"]').click()

        cy.contains('E-mail enviado com sucesso!')
            .should('be.visible')

        cy.mailosaurGetMessage(serverID, {
            sentTo: emailAddress
        }).then(message => {
            const confirmationCodigo = message.html.body.match(/\d{4}/)[0]

            cy.get('[id="code"]').type(confirmationCodigo)
            cy.get('[class="button bg-green fn-s12 m-t-1"]').click()
        })
    });

    it('Login com dados corretos', () => {

        cy.get('#loginEmail').type(Cypress.env('emailLogin'))
        cy.get('#loginPassword').type(Cypress.env('passwordLogin'))
        cy.get('#loginEntrar').click()

        cy.url()
            .should('eq', Cypress.env('urlLogin'))
    });
})