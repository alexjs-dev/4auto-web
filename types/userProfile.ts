import Image from './image'

type UserProfile = {
  firstName: string
  lastName: string
  isVerified: boolean
  personalId?: string
  description?: string
  birthDate?: string
  onlineAt?: string
  username?: string
  gender?: 'male' | 'female'
  imageId?: string
  createdAt?: string
  updatedAt?: string
  image?: Image
  _id: string
  __v?: number
}

export default UserProfile
