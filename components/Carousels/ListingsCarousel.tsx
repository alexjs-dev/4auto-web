import React, { useEffect } from 'react'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'

import Carousel from 'react-multi-carousel'
import Loader from '../Loader/Loader'
import styles from './ListingsCarousel.module.scss'
import useViewport from '../../hooks/useViewport'
import { VehicleCard, TripleButtonGroup } from '../'
import ListingType from '../../types/vehicle'
import Creators from '~/store/listing/creators'
import { getVehicleCardProps } from '../../utils/helpers'
import {
  listingsSelector,
  recommendedListingSelector,
  featuredListingSelector,
  listingsLoadingSelector,
  recommendedListingLoadingSelector,
  featuredListingLoadingSelector,
} from '~/store/listing/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

type Props = {
  title: string
  type?: 'FEATURED' | 'RECOMMENDED' | 'DEFAULT' | 'CUSTOM'
  loading?: boolean
  listings?: ListingType[]
}

const ListingsCarousel: React.FunctionComponent<Props> = ({
  title,
  type,
  loading,
  listings,
}) => {
  const { isMobile } = useViewport()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const selectedListings: ListingType[] = useSelector(
    type === 'FEATURED'
      ? featuredListingSelector
      : type === 'RECOMMENDED'
      ? recommendedListingSelector
      : listingsSelector
  )

  const currentListings = listings || selectedListings

  const selectedLoading: boolean = useSelector(
    type === 'FEATURED'
      ? featuredListingLoadingSelector
      : type === 'RECOMMENDED'
      ? recommendedListingLoadingSelector
      : listingsLoadingSelector
  )

  const currentLoading = loading || selectedLoading

  useEffect(() => {
    if (
      type !== 'CUSTOM' &&
      !loading &&
      isEmpty(currentListings) &&
      !listings
    ) {
      dispatch(
        type === 'FEATURED'
          ? Creators.fetchFeaturedListings()
          : type === 'RECOMMENDED'
          ? Creators.fetchRecommendedListings()
          : Creators.fetchListings()
      )
    }
  }, [dispatch, Creators, loading, type, currentListings, listings])

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1441 },
      items: 4,
      slidesToSlide: 4,
    },
    desktop: {
      breakpoint: { max: 1440, min: 1281 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1280, min: 990 },
      items: 3,
      slidesToSlide: 3,
    },
    mobile: {
      centerMode: true,
      breakpoint: { max: 989, min: 0 },
      items: 2,
      slidesToSlide: 2,
    },
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>{title}</h1>
        {isEmpty(currentListings) && currentLoading && (
          <div>
            <Loader centered loading isBranded={false} />
          </div>
        )}
        {isEmpty(currentListings) && !currentLoading && (
          <h6 style={{ textAlign: 'center' }}>{t('errors.nothingFound')}</h6>
        )}
        {!isEmpty(currentListings) && (
          <Carousel
            ssr
            infinite
            showDots={false}
            arrows={!isMobile}
            renderButtonGroupOutside
            draggable
            swipeable
            autoPlay={false}
            responsive={responsive}
            autoPlaySpeed={5000}
            customButtonGroup={<TripleButtonGroup />}
          >
            {map(currentListings, (listing, i) => (
              <VehicleCard
                key={i}
                {...getVehicleCardProps(listing)}
                listingId={listing._id}
              />
            ))}
          </Carousel>
        )}
      </div>
    </div>
  )
}

export default React.memo(ListingsCarousel)
