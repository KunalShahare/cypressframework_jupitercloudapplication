class HomePage{

    getContactPage()
    {
        return cy.get('#nav-contact > a');
    }

    getShopPage()
    {
        return cy.get('#nav-shop > a');
    }
}
export default HomePage;