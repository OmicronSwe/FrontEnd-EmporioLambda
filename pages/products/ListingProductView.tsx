import React from "react"
import Layout from "../../components/layout"
import ProductList from "./UI/ProductList"

class ProductListingView extends React.Component<{ products; addToCart }> {
  render() {
    const { products, addToCart } = this.props

    return (
      <React.Fragment>
        <Layout>
          <ProductList addToCart={addToCart} products={products} />
        </Layout>
      </React.Fragment>
    )
  }
}

export default ProductListingView
