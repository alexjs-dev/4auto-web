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
import useFindListing from '../../hooks/useFindListing'
import useFindFeaturedListingsOnMount from '../../hooks/useFindFeaturedListingsOnMount'

type Props = {
  prefetchedListing?: ListingType
}

type SoldDisclaimerProps = {
  title?: string
}
const SoldDisclaimer: React.FunctionComponent<SoldDisclaimerProps> = ({
  title,
}) => {
  if (!title) return null
  return (
    <div className={styles.soldDisclaimerContainer}>
      <span>{title}</span>
    </div>
  )
}

const ListingPage: React.FunctionComponent<Props> = ({ prefetchedListing }) => {
  const { t } = useTranslation()
  const currentListing = useSelector(currentListingSelector)
  const loading = useSelector(currentListingLoadingSelector)
  console.log('prefetchedListing', prefetchedListing)
  const router = useRouter()
  const { id } = router.query
  const listing: ListingType = isEmpty(currentListing)
    ? prefetchedListing
    : currentListing

  useFindListing({ id, prefetchedListing })
  useFindFeaturedListingsOnMount()

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

  const isSold = !!listing.soldAt

  return (
    <div className={styles.container}>
      <Images listing={listing} />
      <Layout className={styles.layout} background="white">
        <h2>{vehicleTitle}</h2>
        <Price
          price={listing.price}
          discountPercentage={listing.discountPercentage}
        />
        {isSold && <SoldDisclaimer title={t('label.listingHasBeenSold')} />}
        <Description description={listing.description} />
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
          email={isSold ? null : listing.contactEmail}
          phone={isSold ? null : listing.contactPhone}
        />
        <h6 className={styles.subtitle}>{t('label.baseDetails')}</h6>
        <VehicleDetails listing={listing} fullHeight />
        {!isSold && (
          <Price
            price={listing.price}
            discountPercentage={listing.discountPercentage}
          />
        )}
        {/* @ts-ignore */}
        {!isSold && <OfferForm disabled={isSold} />}
        <VehicleAdvDetails vehicle={listing.vehicle} />
        <div className={styles.spacer} />
        <ListingsCarousel
          type="FEATURED"
          title={t('titles.featuredVehicles')}
        />
      </Layout>
    </div>
  )
}

export async function getStaticPaths() {
  try {
    const listingsService = new ListingsService()
    const listingQuery = await listingsService.find()
    const listings: ListingType[] = listingQuery.data
    const paths =
      listings &&
      listings.map((listing) => ({
        params: { id: listing._id },
      }))
    return { paths, fallback: true }
  } catch (e) {
    console.error(e)
    return { paths: [], fallback: false }
  }
}

export async function getStaticProps({ params }: any) {
  try {
    const listingsService = new ListingsService()
    const prefetchedListing: ListingType[] = await listingsService.get(params.id)
    return { props: { prefetchedListing }, revalidate: 6000 }
  } catch (e) {
    return { props: { prefetchedListing: null }, revalidate: 6000 }
  }
}

export default ListingPage
