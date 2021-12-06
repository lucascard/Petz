describe('Tela de Registro PJ', () => {
    beforeEach(() => {
        cy.visit('/' + "checkout/cadastro/home")
        cy.get(':nth-child(2) > a > .tab-head').click()
        cy.contains('Razão Social').should('be.visible')
    })

    it('PJ - Razão Social inválida', () => {

        cy.get('#cadastroCriarContaJuridica').click()
        cy.get('[style=""] > form > :nth-child(1) > .field')
            .contains('Campo obrigatório.')
            .should('be.visible')
    });

    it('PJ - Email inválido', () => {

        cy.get('#cadastroCriarContaJuridica').click()
        cy.get('[style=""] > form > :nth-child(2) > .field')
            .contains('Campo obrigatório.')
            .should('be.visible')

        cy.get('#cadastroEmailJuridica').type('semArroba')
        cy.get('#cadastroCriarContaJuridica').click()

        cy.contains('Insira um e-mail válido.')
            .should('be.visible')
    });

    it('PJ - Celular inválido', () => {

        cy.get('#cadastroCriarContaJuridica').click()
        cy.get('[style=""] > form > :nth-child(3) > .field')
            .contains('Campo obrigatório.')
            .should('be.visible')

        cy.get('#cadastroCelularJuridica').type('semNumero')
        cy.get('#cadastroCriarContaJuridica').click()

        cy.contains('Insira um número de celular válido.')
            .should('be.visible')

    });

    it('PJ - CNPJ inválido', () => {

        cy.get('#cadastroCriarContaJuridica').click()
        cy.get('[style=""] > form > :nth-child(6) > .field')
            .contains('Campo de preenchimento obrigatório.')
            .should('be.visible')

        cy.get('#cadastroCNPJ').type('78745')
        cy.get('#cadastroCriarContaJuridica').click()

        cy.contains('CNPJ inválido')
            .should('be.visible')
    });

    it('PJ - Inscrição estadual inválida', () => {

        cy.get('#cadastroCriarContaJuridica').click()
        cy.get('.ie')
            .contains('Inscrição estadual inválida.')
            .should('be.visible')

        cy.get('#cadastroIsentoIE > .check').click()

        cy.get('#cadastroIE')
        .should('have.disabled', "disabled")

        cy.get('#cadastroEstadoIE')
        .should('have.disabled', "disabled")
    });

    it('PJ - Senha obrigatória', () => {

        cy.get('#cadastroCriarContaJuridica').click()
        cy.get('[style=""] > form > :nth-child(9) > .field')
            .contains('Campo obrigatório.')
            .should('be.visible')

    });

    it('PJ - Visualizar senha', () => {
        cy.get('#cadastroCheckBoxSenhaJuridica > .mdi').click()
        cy.get('#cadastroCheckBoxConfirmarSenhaJuridica > .mdi').click()

        cy.get('#cadastroConfirmarSenhaJuridica')
        .should('have.attr', 'type', 'text')

        cy.get('#cadastroSenhaJuridica').type('senhaVisível')
        .should('have.attr', 'type', 'text')
    });

    it('PJ -  Senha inválida', () => {

        cy.get('#cadastroSenhaJuridica').type('1')
        cy.get('#cadastroConfirmarSenhaJuridica').type('1')

        cy.get('#cadastroCriarContaJuridica').click()
        cy.contains('Mínimo de 3 caracteres.')
        .should('be.visible')
    });

    it('PJ - Senha não coincide', () => {

        cy.get('#cadastroSenhaJuridica').type('2')
        cy.get('#cadastroConfirmarSenhaJuridica').type('1')

        cy.get('#cadastroCriarContaJuridica').click()
        cy.contains('As senhas não conferem.')
        .should('be.visible')
    });

    it('PJ - Termo não aceito', () => {

        cy.get('#cadastroCriarContaJuridica').click()

        cy.contains('Selecione a opção "Concordo com os termos e condições" para se cadastrar.')
        .should('be.visible')
    });
})