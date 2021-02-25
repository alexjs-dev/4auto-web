import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import ListingType from '../types/listing'
import Creators from '../store/listing/creators'

type Props = {
  prefetchedListing?: ListingType
  id?: string | undefined | string[]
}

const useFindListing = (props: Props) => {
  const { prefetchedListing, id } = props
  if (!process.browser) return null
  const dispatch = useDispatch()
  useEffect(() => {
    if (id || isEmpty(prefetchedListing)) {
      dispatch(Creators.fetchListingById(id))
    }
  }, [dispatch, Creators, id])
}

export default useFindListing
