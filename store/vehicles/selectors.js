export const listingsSelector = (state) => state.vehicles.listings
export const modelsSelector = (state) => state.vehicles.models
export const makesSelector = (state) => state.vehicles.makes

export const vehiclesLoadingSelector = (state) => state.vehicles.loading
export const modelsLoadingSelector = (state) => state.vehicles.loadingModels
export const makesLoadingSelector = (state) => state.vehicles.loadingMakes

export const vehiclesPaginationSelector = (state) => state.vehicles.pagination
