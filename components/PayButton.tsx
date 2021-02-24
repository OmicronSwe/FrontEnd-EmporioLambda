import React from "react"
import StripeCheckout from "react-stripe-checkout"

import config from "../config"

class PayButton extends React.Component<{ amount }> {
  //component to create the checkout system (button + form + sending the payment)
  constructor(props) {
    super(props)
    this.onToken = this.onToken.bind(this)
  }

  async onToken(token) {
    const res = await fetch("../api/stripe", {
      //internal API to call external API to execute the checkout
      method: "POST",
      body: JSON.stringify({
        token,
        charge: {
          amount: this.props.amount,
          currency: config.stripe.currency,
        },
      }),
    })
    const data = await res.json()

    document.getElementById("message").innerHTML = data.message //return the message to the client
  }

  render() {
    return (
      <StripeCheckout // pre-made checkout system (button + form)
        name="Serverless Stripe Store Inc."
        token={this.onToken}
        amount={this.props.amount}
        currency={config.stripe.currency}
        stripeKey={config.stripe.apiKey} // Stripe publishable API key
        allowRememberMe={false}
      />
    )
  }
}

export default PayButton
