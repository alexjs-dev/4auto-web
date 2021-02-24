import React from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import isEmpty from 'lodash/isEmpty'
import {
  Loader,
  Layout,
  OfferForm,
  ListingsCarousel,
  VehicleAdvDetails,
} from '../../components'
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
        <Avatar
          title={t('market.seller')}
          userId={listing.userId}
          avatarSrc={listing.user.profile?.image?.url}
          username={
            listing.user.profile?.username || listing.user.profile?.firstName
          }
        />
        <VotdActions
          userId={listing.userId}
          email={listing.contactEmail}
          phone={listing.contactPhone}
        />
        <h6 className={styles.subtitle}>{t('label.baseDetails')}</h6>
        <VehicleDetails listing={listing} fullHeight />
        <Price
          price={listing.price}
          discountPercentage={listing.discountPercentage}
        />
        <OfferForm />
        <VehicleAdvDetails vehicle={listing.vehicle} />
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
  const listingQuery = await listingsService.find({
    query: {
      $limit: 50,
      $sort: {
        createdAt: -1,
      },
    },
  })
  const listings: ListingType[] = listingQuery.data
  const paths =
    listings &&
    listings.map((listing) => ({
      params: { id: listing._id },
    }))
  return { paths, fallback: true }
}

export async function getStaticProps({ params }: any) {
  try {
    const listingsService = new ListingsService()
    const listing: ListingType[] = await listingsService.get(params.id)
    return { props: { prefetchedListing: listing } }
  } catch (e) {
    return { props: { prefetchedListing: null } }
  }
}

export default ListingPage
