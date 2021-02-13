import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Creators from '../../store/listing/creators'
import { useTranslation } from 'react-i18next'
import { Carousel } from 'react-responsive-carousel'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import { Loader, Layout } from '../../components'
import ListingsService from '../../services/listings'
import {
  currentListingSelector,
  currentListingLoadingSelector,
} from '../../store/listing/selectors'
import ListingType from '../../types/listing'
import styles from './listing.module.scss'
import { getVehicleTitle } from '~/utils/helpers'

type Props = {
  prefetchedListing?: ListingType[]
}

const ListingPage: React.FunctionComponent<Props> = ({ prefetchedListing }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const currentListing = useSelector(currentListingSelector)
  const loading = useSelector(currentListingLoadingSelector)
  const router = useRouter()
  const { id } = router.query
  const listing: ListingType = !isEmpty(prefetchedListing)
    ? prefetchedListing
    : currentListing
  useEffect(() => {
    if (id && isEmpty(prefetchedListing)) {
      dispatch(Creators.fetchListingById(id))
    }
  }, [dispatch, Creators, id])
  if ((loading && isEmpty(prefetchedListing)) || isEmpty(listing)) {
    return (
      <div className={styles.container}>
        <Loader centered loading isBranded fullscreen />
      </div>
    )
  }

  const { power, capacity } = listing.vehicle
  const vehicleTitle = getVehicleTitle(
    {
      make: listing.vehicle.model.make.name,
      model: listing.vehicle.model.name,
      power,
      capacity,
    },
    t
  )

  return (
    <div className={styles.container}>
      <Carousel
        showThumbs={false}
        infiniteLoop
        emulateTouch
        swipeable
        useKeyboardArrows
        showIndicators
        showStatus={false}
        showArrows
        className={styles.images}
      >
        {map(listing.vehicle.images, (image) => (
          <div key={image.order}>
            <img
              src={image.url}
              alt={image.order.toString()}
              draggable="false"
            />
          </div>
        ))}
      </Carousel>
      <Layout>
        <h1>{vehicleTitle}</h1>
      </Layout>
    </div>
  )
}

export async function getStaticPaths() {
  const listingsService = new ListingsService()
  const listingQuery = await listingsService.find()
  const listings: ListingType[] = listingQuery.data
  const paths =
    listings &&
    listings.map((listing) => ({
      params: { id: listing._id },
    }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }: any) {
  const listingsService = new ListingsService()
  const listing: ListingType[] = await listingsService.get(params.id)
  return { props: { prefetchedListing: listing } }
}

export default ListingPage
