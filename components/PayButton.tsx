import React from "react"
import StripeCheckout from "react-stripe-checkout"

import config from "../config"

class PayButton extends React.Component<{ amount }> {
  constructor(props) {
    super(props)
    this.onToken = this.onToken.bind(this)
  }

  async onToken(token) {
    const res = await fetch("../api/stripe", {
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
    console.log(
      JSON.stringify({
        token,
        charge: {
          amount: this.props.amount,
          currency: config.stripe.currency,
        },
      })
    )
    console.log("onToken") // Logs for ease of debugging
    console.log(data)

    document.getElementById("message").innerHTML = data.message
  }

  render() {
    return (
      <StripeCheckout
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
