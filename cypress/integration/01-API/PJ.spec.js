describe('Testes API', () => {
    beforeEach(() => {

    })

    it.skip('Login com senha inválida', () => {

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

})