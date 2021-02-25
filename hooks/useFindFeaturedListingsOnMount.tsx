import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Creators from '../store/vehicles/creators'

const useFindFeaturedListingsOnMount = () => {
  if (!process.browser) return null
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(Creators.fetchListings()) // TO-DO: add featured listings filter, move to shared hooks folders
  }, [dispatch, Creators])
}

export default useFindFeaturedListingsOnMount
