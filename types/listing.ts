type Listing = {
  _id: string
  model: string
  make: string
  regDate: string
  power: number
  capacity: number
  mileage: number
  bodyType: string
  price: number
  discountPercentage: number
  fuel: string
  transmission: string
  city: string
  countryCode: string
  country: string
  urgent: boolean
  featured: boolean
  recommended: boolean
  images: any[]
}

export default Listing
