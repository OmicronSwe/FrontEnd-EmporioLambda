import React from "react"
import ListingProductController from "./ListingProductController"
import ListingProductViewModel from "./ListingProductViewModel"
import ListingProductModel from "./ListingProductModel"
import { GetServerSideProps } from "next"
import { getlambdaResponse } from "../api/lib/lambdas"
import { getSession } from "next-auth/client"

class ListingProductProvider extends React.Component<{ products; session }> {
  viewModel

  constructor(props) {
    super(props)
    const listingProductModel = new ListingProductModel()
    this.viewModel = new ListingProductViewModel(listingProductModel)
  }

  render() {
    return (
      <ListingProductController
        viewModel={this.viewModel}
        products={this.props.products}
        session={this.props.session}
      />
    )
  }
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      products: await (await getlambdaResponse("product")).props.response, //return API response
      session: await getSession({ req }), //return session data
    },
  }
}

export default ListingProductProvider
