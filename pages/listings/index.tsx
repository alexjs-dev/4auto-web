import React, { useEffect } from 'react'
import map from 'lodash/map'
import styles from './listing.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import {
  myListingsSelector,
  myListingsLoadingSelector,
} from '../../store/listing/selectors'
import ListignsCreator from '../../store/listing/creators'
import { Layout, Loader, VehicleCard } from '../../components'
import { getVehicleCardProps } from '~/utils/helpers'

const ListingsPage = () => {
  const loading = useSelector(myListingsLoadingSelector)
  const listings = useSelector(myListingsSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(ListignsCreator.fetchMyListings())
  }, [])
  return (
    <Layout background="gray" fullscreen className={styles.container}>
      <h1>Listings</h1>
      <div className={styles.listings}>
        {map(listings, (listing) => (
          <VehicleCard
            key={listing._id}
            {...getVehicleCardProps(listing)}
            listingId={listing._id}
          />
        ))}
        <Loader loading={loading} />
      </div>
    </Layout>
  )
}

export default ListingsPage
