class ListingProductViewModel {
  model

  constructor(listingProductModel) {
    this.model = listingProductModel
  }

  getProducts() {
    return this.model.getProducts()
  }

  addToCart(session, id) {
    return this.model.addToCart(session, id)
  }
}

export default ListingProductViewModel
