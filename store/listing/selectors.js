export const currentListingSelector = (state) => state.listing.currentListing
export const currentListingLoadingSelector = (state) =>
  state.listing.loadingListing


export const myListingsPaginationSelector = (state) => state.listing.myListingsPagination
export const myListingsSelector = (state) => state.listing.myListings
export const myListingsLoadingSelector = (state) => state.listing.loadingMyListings

export const listingPaginationSelector = (state) => state.listing.pagination
export const listingsSelector = (state) => state.listing.listings
export const listingsLoadingSelector = (state) => state.listing.loading

export const listingCreationLoadingSelector = (state) =>
  state.listing.creatingListing

export const recommendedListingPaginationSelector = (state) =>
  state.listing.recommendedPagination
export const recommendedListingSelector = (state) =>
  state.listing.recommendedListings
export const recommendedListingLoadingSelector = (state) =>
  state.listing.loadingRecommended

export const featuredListingPaginationSelector = (state) =>
  state.listing.featuredPagination
export const featuredListingSelector = (state) => state.listing.featuredListings
export const featuredListingLoadingSelector = (state) =>
  state.listing.loadingFeatured

export const userSoldListingsSelector = (state) =>
  state.listing.userSoldListings
export const userSoldListingsPaginationSelector = (state) =>
  state.listing.userSoldListingsPagination
export const loadingUserSoldListingsSelector = (state) =>
  state.listing.loadingUserSoldListings

export const userAvailableListingsSelector = (state) =>
  state.listing.userAvailableListings
export const userAvailableListingsPaginationSelector = (state) =>
  state.listing.userAvailableListingsPagination
export const loadingUserAvailableListingsSelector = (state) =>
  state.listing.loadingUserAvailableListings
