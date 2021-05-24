/// <reference types="Cypress" />
import HomePage from '../page/HomePage';
import ShopPage from '../page/ShopPage';
import CartPage from '../page/CartPage';

describe('Jupiter Toys - Cart Menu Items', function() {
    
    beforeEach(function(){

        cy.fixture('TC3_productData').then(function(data)
        {
            this.data=data;
        })
    })

    it('Verify the user selected items on Cart Menu', function() {
        const homePage = new HomePage();
        const shopPage = new ShopPage();
        const cartPage = new CartPage();

        // Navigate to Contact Page
        cy.visit(Cypress.env('url'));
        homePage.getShopPage().click();

        // Logic to add Product - Command selectProduct and fixtures data have been used for code optimization
        this.data.productName.forEach(function(element){
            cy.selectProduct(element);
        })

        // Click on Cart Button to view selected products
        shopPage.getCartButton().click();

        // Verify the items are in the cart
        var actualProduct = new Array();
        var expectedProduct = new Array();
        
        cartPage.getCartItemList().each(($el, index) => {
            var item=$el.text();
            item = item.trim();
            if(actualProduct.indexOf(item) === -1)
            {
                actualProduct.push(item);
            }
        }).then(function()
        {   
            this.data.productName.forEach(function(element){
            if(expectedProduct.indexOf(element) === -1)
            {
                expectedProduct.push(element);
            }
            })
            expect(actualProduct).to.eqls(expectedProduct);
        })
    })
})