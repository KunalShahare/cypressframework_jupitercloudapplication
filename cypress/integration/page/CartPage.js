class CartPage{

    getCartItemList()
    {
        return cy.get('tr td:nth-child(1).ng-binding');
    }

    getCartSubtotalList()
    {
        return cy.get('tr td:nth-child(4).ng-binding');
    }
    
    getCartTotalAmount()
    {
        return cy.get('tfoot > :nth-child(1) > td');
    }

    getCartPriceList()
    {
        return cy.get('tr td:nth-child(2).ng-binding');
    }
    
}
export default CartPage;