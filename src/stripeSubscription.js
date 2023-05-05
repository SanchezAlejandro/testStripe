const stripe = require ( "stripe" ) ( process.env.REACT_APP_STRIPE_SECRET_KEY );

// Devuelve el ID del producto correspondiente al plan comprado, devuelve NULL por default.  
//  type = 1 (Pago único) | type = 2 (Suscripción).
const stripePlan = (condoInfo, type) => {
    const quantity = condoInfo.houses;
    let productID = "";

    switch(type){
        case 1: 
            if(quantity >= 1 && quantity <= 100){
                productID = process.env.REACT_APP_PRODUCT_BASIC_UNIQUE;
            }
            else if(quantity >= 101 && quantity <= 300){
                productID = process.env.REACT_APP_PRODUCT_INTERMEDIATE_UNIQUE;
            }
            else if(quantity >= 301 && quantity <= 500){
                productID = process.env.REACT_APP_PRODUCT_ADVANCED_UNIQUE;
            }
            else {
                productID = process.env.REACT_APP_PRODUCT_PREMIUM_UNIQUE;
            }
        break;

        case 2: 
            if(quantity >= 1 && quantity <= 100){
                productID = process.env.REACT_APP_PRODUCT_BASIC_SUBSCRIPTION;
            }
            else if(quantity >= 101 && quantity <= 300){
                productID = process.env.REACT_APP_PRODUCT_INTERMEDIATE_SUBSCRIPTION;
            }
            else if(quantity >= 301 && quantity <= 500){
                productID = process.env.REACT_APP_PRODUCT_ADVANCED_SUBSCRIPTION;
            }
            else {
                productID = process.env.REACT_APP_PRODUCT_PREMIUM_SUBSCRIPTION;
            }
        break;

        default: 
            productID = null;
    }

    return productID;
}


const stripeSubscription = async (condoInfo) => {

    const productID = stripePlan (condoInfo, 2);
    console.log(productID);

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {// Producto 1:
                price: productID,
                quantity: condoInfo.houses
            }
        ],
        payment_method_types: [
            "card"
        ],
        mode: "subscription",
        success_url: `http://localhost:3000/success`,
        cancel_url: `http://localhost:3000?cancelled=true`
    })
    return session;
}

export default stripeSubscription;