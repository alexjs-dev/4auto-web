import UserProfile from './userProfile'

type User = {
  role: number
  _id: string
  createdAt?: string
  updatedAt?: string
  profile?: UserProfile
  __v?: number
}

export default User
