describe('Registro PF', () => {
    beforeEach(() => {
        cy.visit('/' + "checkout/cadastro/home")

    })

    it('PF - Nome inválido ', () => {
        cy.get('.register-title').should('be.visible')
        cy.get('#cadastroNome').type('12832183')

        cy.get('#cadastroCriarConta').click() //salvar
        cy.contains('Insira seu nome e sobrenome.')
            .should('be.visible')

        cy.get('#cadastroNome').clear().type('lucas 23')
        cy.get('#cadastroCriarConta').click() //salvar

        cy.contains('Insina um nome válido.')
            .should('be.visible')
    });

    const registroPF = require('../../fixtures/registroPF')

    registroPF.forEach((register) => {
        it(`PF - ${register.teste}`, () => {
            cy.get('.register-title').should('be.visible')
            cy.get('#cadastroCriarConta').click() //salvar

            cy.get(`[style=""] > form > :nth-child(${register.field}) > .field`)
                .contains(register.obrigatorio)
                .should('be.visible')

            cy.get(`#cadastro${register.idInput}`).type(register.dadoInvalido)
            cy.get('#cadastroCriarConta').click() //salvar

            cy.contains(register.msgErro)
                .should('be.visible')

        });
    })

    it('PF - CPF já cadastrado', () => {
        cy.get('#cadastroNome').type('Lucas Rodrigues')
        cy.get('#cadastroEmailFisica').type('testetea@gmail.com')
        cy.get('#cadastroCelularFisica').type('61998156697')
        cy.get('#cadastroCPF').type('36578208844')
        cy.get('#cadastroSenhaFisica').type('0208')
        cy.get('#cadastroConfirmarSenhaFisica').type('0208')
        cy.get('[style=""] > form > .policiesCheckBox > .field > .b-checkbox > .check').click()
        cy.get('#cadastroCriarConta').click() //salvar
        cy.contains('CPF já cadastrado.').should('be.visible')

    });

    it('PF - Senha não coincide', () => {
        cy.get('#cadastroNome').type('Lucas Rodrigues')
        cy.get('#cadastroEmailFisica').type('testetea@gmail.com')
        cy.get('#cadastroCelularFisica').type('61998156697')
        cy.get('#cadastroCPF').type('42837600059')
        cy.get('#cadastroSenhaFisica').type('23')
        cy.get('#cadastroConfirmarSenhaFisica').type('0208')
        cy.get('[style=""] > form > .policiesCheckBox > .field > .b-checkbox > .check').click()
        cy.get('#cadastroCriarConta').click() //salvar
        cy.contains('As senhas não conferem.').should('be.visible')

    });

    it('PF - Senha inválida', () => {
        cy.get('#cadastroNome').type('Lucas Rodrigues')
        cy.get('#cadastroEmailFisica').type('testetea@gmail.com')
        cy.get('#cadastroCelularFisica').type('61998156697')
        cy.get('#cadastroCPF').type('42837600059')
        cy.get('#cadastroSenhaFisica').type('23')
        cy.get('#cadastroConfirmarSenhaFisica').type('23')
        cy.get('[style=""] > form > .policiesCheckBox > .field > .b-checkbox > .check').click()
        cy.get('#cadastroCriarConta').click() //salvar
        cy.contains('Mínimo de 3 caracteres.').should('be.visible')
    });

    it('PF - Termo não aceito', () => {

        cy.get('#cadastroCriarConta').click()
        cy.contains('Selecione a opção "Concordo com os termos e condições" para se cadastrar.')
            .should('be.visible')
    })
})