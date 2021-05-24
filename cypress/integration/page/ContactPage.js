class ContactPage{
    
    getSubmitButton()
    {
        return cy.get('.btn-contact');
    }

    getSubmissionAlert()
    {
        return cy.get('.alert');
    }

    getForenameEditBox()
    {
        return cy.get('#forename');
    }

    getForenameError()
    {
        return cy.get('#forename-err');
    }

    getEmailEditBox()
    {
        return cy.get('#email');
    }

    getEmailError()
    {
        return cy.get('#email-err');
    }

    getMessageEditBox()
    {
        return cy.get('#message');
    }

    getMessageError()
    {
        return cy.get('#message-err');
    }

    getContactSubmitButton()
    {
        return cy.get('.btn-contact');
    }

}
export default ContactPage;