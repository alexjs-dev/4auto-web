import React, { useEffect } from 'react'
import map from 'lodash/map'
import styles from './listing.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import {
  myListingsSelector,
  myListingsLoadingSelector,
} from '../../store/listing/selectors'
import ListingsCreator from '../../store/listing/creators'
import { Layout, Loader, VehicleCard, Input } from '../../components'
import { getVehicleCardProps } from '~/utils/helpers'

const ListingsPage = () => {
  const loading = useSelector(myListingsLoadingSelector)
  const listings = useSelector(myListingsSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(ListingsCreator.fetchMyListings())
  }, [])
  return (
    <Layout fullscreen className={styles.container}>
      <h1>Listings</h1>
      <div className={styles.listings}>
        {map(listings, (listing) => {
          console.log('listing', listing);
          return (
            <div key={listing._id} className={styles.listing}>
              <div className={styles.title}>
                <h4>BMW 6, 317BNV</h4>
                <div className={styles.titleDetails}>
                  <span>Expires in 13 days</span>
                  <span>Featured until 29.09.2021</span>
                </div>
              </div>

              <div className={styles.content}>
                <form>
                  {/* @ts-ignore */}
                  <Input name="price" label="Price" type="number" value={listing.price} />
                </form>
                <VehicleCard
                  {...getVehicleCardProps(listing)}
                  listingId={listing._id}
                  isSold={!!listing.soldAt}
                  isAdmin
                />
              </div>
            </div>
          )
        })}
        <Loader loading={loading} centered />
      </div>
    </Layout>
  )
}

export default ListingsPage
