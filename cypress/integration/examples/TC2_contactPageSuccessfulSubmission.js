/// <reference types="Cypress" />
import HomePage from '../page/HomePage';
import ContactPage from '../page/ContactPage';

describe('Jupiter Toys - Feedback Successful Submission', function() {
    
    beforeEach(function(){

        cy.fixture('TC1_TC2_customerData').then(function(data)
        {
            this.data=data;
        })
    })
    
    // Repeat same test for 5 times
    Cypress._.times(5, (k) => {
    it('Verify the Successful Submission message on Contact Page', function() {
        const homePage = new HomePage();
        const contactPage = new ContactPage();
        
        // Navigate to Contact Page
        cy.visit(Cypress.env('url'));
        homePage.getContactPage().click();

        // Enter data for mandatory fields and Submit
        contactPage.getForenameEditBox().type(this.data.forename);
        contactPage.getEmailEditBox().type(this.data.email);
        contactPage.getMessageEditBox().type(this.data.message);
        contactPage.getContactSubmitButton().click();
           
        // Validate the Successful Submission message
        Cypress.config('defaultCommandTimeout', 20000);
        contactPage.getSubmissionAlert().should("contain","Thanks "+ this.data.forename +", we appreciate your feedback.");
                 
    })
})
})