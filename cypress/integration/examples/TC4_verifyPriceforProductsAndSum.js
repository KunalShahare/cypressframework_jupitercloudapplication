/// <reference types="Cypress" />
import HomePage from '../page/HomePage';
import ShopPage from '../page/ShopPage';
import CartPage from '../page/CartPage';

describe('Jupiter Toys - E2E Test Case', function() {
    
    beforeEach(function(){

        cy.fixture('TC4_productData').then(function(data)
        {
            this.data=data;
        })
    })

    it('Verify the price for each product, each product subtotal and sum total of all products', function() {
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

        // ******************************************************
        // Verify the Total Sum of all Products = sum(subtotal)
        // *******************************************************
        var sum = 0;
        cartPage.getCartSubtotalList().each((subTotal, index, $list) => {
            const amount=subTotal.text();
            var res= amount.split("$");
            res= res[1].trim();
            sum= Number(sum)+Number(res);
        }).then(function()
           {
               cy.log(sum);
           })
           
        cartPage.getCartTotalAmount().then(function(element)
        {
            const amount=element.text();
            var res= amount.split(" ")
            var total= res[1].trim();
            expect(Number(total)).to.equal(sum);
        })

        // *************************************************************
        // Verify that each product subtotal = product price * quantity
        // *************************************************************
         var i = 0;
         var j = 0;
         var countOfRows = 0;
         var prodPrice = 0;
         var priceArray = new Array();
         var quantityArray = new Array();
         var subTotalArray = new Array();

         cartPage.getCartPriceList().each((subTotal, index, $list) => {
             const amount=subTotal.text();
             var price= amount.split("$");
             prodPrice = price[1].trim();
             prodPrice = Number(prodPrice);
             //cy.log(prodPrice);

             if(priceArray.indexOf(prodPrice) === -1)
             {
                priceArray.push(prodPrice);
             }
                
        }).then(function()
        {
            // Count of number Product Rows in Cart
            countOfRows=priceArray.length;
                        
            for(i=1; i<=countOfRows; i++)
            {
                cy.get(':nth-child('+i+') > :nth-child(3) > .input-mini').should(($input) => {
                    var val = $input.val()
                    val=Number(val);
                    if(quantityArray.indexOf(val) === -1)
                    {
                        quantityArray.push(val);
                    }
                })
            }
            cartPage.getCartSubtotalList().each((subTotal, index, $list) => {
                const amount=subTotal.text();
                var res= amount.split("$");
                res= res[1].trim();
                res = Number(res);

                if(subTotalArray.indexOf(res) === -1)
                {
                    subTotalArray.push(res);
                }
                          
            }).then(function()
                {
                for(j=0; j<countOfRows; j++)
                    {
                        expect(priceArray[j]*quantityArray[j]).to.eql(subTotalArray[j]);
                    }
                })
        })
    })
})