const stripe = require ( "stripe" ) ( process.env.REACT_APP_STRIPE_SECRET_KEY );

const productID = process.env.REACT_APP_STRIPE_PRODUCT_PRICE_ID;



const stripeSubscription = async (condoInfo) => {
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
        success_url: `http://localhost:3005/success`,
        cancel_url: `http://localhost:3005?cancelled=true`
    })
    return session;
}

export default stripeSubscription;