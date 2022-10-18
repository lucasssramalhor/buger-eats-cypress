class SignupPage {
  //Acesso a URL, definição de viewport e verificação se está no endereço correto
  go() {
    // cy.viewport(1920, 1080);
    cy.visit('https://buger-eats-qa.vercel.app');
    cy.get('a[href="/deliver"]').click();
    cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas');
  }

  fillForm(deliver) {
    //Busca dos dados do entregador
    cy.get('input[name="fullName"]').type(deliver.name);
    cy.get('input[name="cpf"]').type(deliver.cpf);
    cy.get('input[name="email"]').type(deliver.email);
    cy.get('input[name="whatsapp"]').type(deliver.whatsapp);

    // Busca dos dados de endereço do entregador
    cy.get('input[name="postalcode"]').type(deliver.address.postalcode);
    cy.get('input[type=button][value="Buscar CEP"]').click();
    cy.get('input[name="address-number"]').type(deliver.address.number);
    cy.get('input[name="address-details"]').type(deliver.address.details);

    // Confirmação do endereço do entregador
    // Busca pelo elemento de endereço e verifica se contém o endereço correto
    cy.get('input[name="address"]').should('have.value',deliver.address.street);
    cy.get('input[name="district"]').should('have.value', deliver.address.district);
    cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state);

    cy.get('.delivery-method li:nth-child(1)').click();
    // Realizando upload de arquivos com o cypress file upload (plugin npm)
    cy.get('input[type="file"]').attachFile(deliver.cnh);
  }

  // Submissão do formulário para validação
  submit() {
    cy.get('form button[type="submit"]').click();
  }

  // Verificação da mensagem esperada
  modalContentShouldBe(expectedMessage) {
    cy.get('.swal2-container .swal2-html-container').should('have.text', expectedMessage);
  }

  // Mensagem de erro esperada para os casos de teste falhos
  alertMessageShouldBe(expectedMessage) {
    // cy.get('span.alert-error').should('have.text', expectedMessage);
    
    // Combina texto com classes e verifica se está visível, é utilizado para quando há vários elementos
    cy.contains('span.alert-error', expectedMessage).should('be.visible');
  }
}

// realizando o import com o new para não precisar instanciar toda vez a classe
export default new SignupPage;