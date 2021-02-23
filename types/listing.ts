import Address from './address'
import Vehicle from './vehicle'
import User from './user'

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
  user: User
  vehicle: Vehicle
  vehicleId: string
  __v?: number
  _id: string
}

export default Listing
