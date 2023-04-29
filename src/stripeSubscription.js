const STRIPE_SECRET_KEY = 'sk_test_51N1FLPCOgPvEYncJAisjjJgucQj6naxPMsj7AcafXHo5GcLtuWvXLfL7NNktHjKEr7GMubyVFPHQ8FOCp8XbXP5v00VPChIHzU'
const STRIPE_PRODUCT_PRICE_ID = "price_1N1FcsCOgPvEYncJlNQ5Xe4B"
const stripe = require ( "stripe" ) ( STRIPE_SECRET_KEY );



const productID = STRIPE_PRODUCT_PRICE_ID;

const stripeSubscription = async () => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {// Producto 1:
                price: productID,
                quantity: 1
            }
        ],
        payment_method_types: [
            "card"
        ],
        mode: "payment",
        success_url: `http://localhost:3005/success`,
        cancel_url: `http://localhost:3005?cancelled=true`
    })
    return session;
}

export default stripeSubscription;