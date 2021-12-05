describe('Registro PJ', () => {
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
        cy.get('#cadastroIE').should('have.disabled', "disabled")
        cy.get('#cadastroEstadoIE').should('have.disabled', "disabled")
    });


    it('PJ - Senha inválida', () => {

        cy.get('#cadastroCriarContaJuridica').click()
        cy.get('[style=""] > form > :nth-child(9) > .field')
            .contains('Campo obrigatório.')
            .should('be.visible')





    });

    it('PJ - Visualizar senha', () => {

        cy.get('#cadastroCriarContaJuridica').click()
        cy.get('[style=""] > form > :nth-child(6) > .field')
            .contains('Campo de preenchimento obrigatório.').should('be.visible')

        cy.get('#cadastroCNPJ').type('78745')
        cy.get('#cadastroCriarContaJuridica').click()

        cy.contains('CNPJ inválido')
            .should('be.visible')
    });


    it('PJ -  inválida', () => {

        cy.get('#cadastroCriarContaJuridica').click()
        cy.get('[style=""] > form > :nth-child(1) > .field')
            .contains('Campo obrigatório.')
            .should('be.visible')
    });

    it('PJ - Razão Social inválida', () => {

        cy.get('#cadastroCriarContaJuridica').click()
        cy.get('[style=""] > form > :nth-child(1) > .field')
            .contains('Campo obrigatório.')
            .should('be.visible')
    });
    it('PJ - Razão Social inválida', () => {

        cy.get('#cadastroCriarContaJuridica').click()
        cy.get('[style=""] > form > :nth-child(1) > .field')
            .contains('Campo obrigatório.')
            .should('be.visible')
    });
    it('PJ - Razão Social inválida', () => {

        cy.get('#cadastroCriarContaJuridica').click()
        cy.get('[style=""] > form > :nth-child(1) > .field')
            .contains('Campo obrigatório.')
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
})