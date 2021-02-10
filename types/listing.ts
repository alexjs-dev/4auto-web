import Address from './address'
import Vehicle from './vehicle'

type Listing = {
  availableUntil: string
  createdAt: string
  discountPercentage: number
  featuredUntil?: string
  location: Address
  locationId: string
  price: number
  recommendedUntil: string
  updatedAt: string
  urgent: boolean
  userId: string
  vehicle: Vehicle
  vehicleId: string
  __v?: number
  _id: string
}

export default Listing
