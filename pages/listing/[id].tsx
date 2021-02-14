import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import isEmpty from 'lodash/isEmpty'
import { Loader, Layout, OfferForm, ListingsCarousel } from '../../components'
import ListingsService from '../../services/listings'
import {
  currentListingSelector,
  currentListingLoadingSelector,
} from '../../store/listing/selectors'
import ListingType from '../../types/listing'
import styles from './listing.module.scss'
import { getVehicleTitle } from '~/utils/helpers'
import Images from './components/Images'
import Price from './components/Price'
import Description from './components/Description'
import Avatar from '../../components/User/Avatar'
import VotdActions from '../../components/VehicleOfTheDay/components/VotdActions'
import VehicleDetails from '../../components/VehicleOfTheDay/components/VehicleDetails'
import useFindListing from './hooks/useFindListing'
import { listingsSelector } from '../../store/vehicles/selectors'
import useFindFeaturedListingsOnMount from './hooks/useFindFeaturedListingsOnMount'

type Props = {
  prefetchedListing?: ListingType
}

const ListingPage: React.FunctionComponent<Props> = ({ prefetchedListing }) => {
  const { t } = useTranslation()
  const currentListing = useSelector(currentListingSelector)
  const loading = useSelector(currentListingLoadingSelector)
  const router = useRouter()
  const { id } = router.query
  const listing: ListingType = !isEmpty(prefetchedListing)
    ? prefetchedListing
    : currentListing

  useFindListing({ id, prefetchedListing })
  useFindFeaturedListingsOnMount()

  const featuredListings = useSelector(listingsSelector) // TO-DO: make separate listings selector for featured vehicles

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
      <Images listing={listing} />
      <Layout className={styles.layout} background="white">
        <h2>{vehicleTitle}</h2>
        <Price
          price={listing.price}
          discountPercentage={listing.discountPercentage}
        />
        <Description />
        <Avatar />
        <VotdActions
          userId={listing.userId}
          email="test@account.com"
          phone="37258587389"
        />
        <h6 className={styles.subtitle}>{t('label.baseDetails')}</h6>
        <VehicleDetails listing={listing} fullHeight />
        <OfferForm />
        <div className={styles.spacer} />
        <ListingsCarousel
          listings={featuredListings}
          title={t('titles.featuredVehicles')}
        />
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
