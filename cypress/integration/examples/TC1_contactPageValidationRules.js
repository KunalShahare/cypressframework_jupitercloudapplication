/// <reference types="Cypress" />
import HomePage from '../page/HomePage';
import ContactPage from '../page/ContactPage';

describe('Jupiter Toys - Contact Page Validations', function() {
    
    beforeEach(function(){

        cy.fixture('TC1_TC2_customerData').then(function(data)
        {
            this.data=data;
        })
    })
    
    it('Verify the Validation rules of all the mandatory fields on Contact Page', function() {
        const homePage = new HomePage();
        const contactPage = new ContactPage();
        
        // Navigate to Contact Page
        cy.visit(Cypress.env('url'));
        homePage.getContactPage().click();

        // Validation errors without entering any data in mandatory fields
        contactPage.getSubmitButton().click();
        contactPage.getSubmissionAlert().contains("We welcome your feedback - but we won't get it unless you complete the form correctly.");
        contactPage.getForenameError().should("contain","Forename is required");
        contactPage.getEmailError().should("contain","Email is required");
        contactPage.getMessageError().should("contain","Message is required");

        // Validation errors are gone after entering values in mandatory fields
        contactPage.getForenameEditBox().type(this.data.forename);
        contactPage.getForenameError().should('not.exist');
        contactPage.getEmailEditBox().type(this.data.email);
        contactPage.getEmailError().should('not.exist');
        contactPage.getMessageEditBox().type(this.data.message);
        contactPage.getMessageError().should('not.exist');
    })
})