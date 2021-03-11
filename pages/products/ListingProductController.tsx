import React from "react"
import ListingProductView from "./ListingProductView"

class ListingProductController extends React.Component<{ viewModel; session; products }> {
  state = {
    //in questo caso, non mi servono stati
  }

  addToCart = (id) => {
    this.props.viewModel.addToCart(this.props.session, id)
  }

  render() {
    return <ListingProductView products={this.props.products} addToCart={this.addToCart} />
  }
}

export default ListingProductController
