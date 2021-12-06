describe('Tela de Registro PJ', () => {
    beforeEach(() => {

    })

    it.only('Login com senha inválida', () => {

        cy.request({
            method: 'POST',
            url: 'https://www.petz.com.br/indexLogado_Loja.html',
            body: {
                logar: false,
                action: 'Login',
                login: "lcsestudoslcs@gmail.com",
                senha: "123"
            }
        }).then(res => console.log(res))
    });

    it('PJ - Email inválido', () => {
3
    });

    it('PJ - Celular inválido', () => {



    });

    it('PJ - CNPJ inválido', () => {


    });

    it('PJ - Inscrição estadual inválida', () => {


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