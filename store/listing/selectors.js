export const currentListingSelector = (state) => state.listing.currentListing
export const currentListingLoadingSelector = (state) =>
  state.listing.loadingListing

export const listingPaginationSelector = (state) => state.listing.pagination
export const listingsSelector = (state) => state.listing.listings
export const listingsLoadingSelector = (state) => state.listing.loading

export const listingCreationLoadingSelector = (state) =>
  state.listing.creatingListing
