import React, { useEffect, useState } from 'react'
import map from 'lodash/map'
import get from 'lodash/get'
import { reduxForm, change, getFormValues } from 'redux-form'
import styles from './listing.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import {
  myListingsSelector,
  myListingsLoadingSelector,
  loadingUpdatingMyListing,
} from '../../store/listing/selectors'
import ListingsCreator from '../../store/listing/creators'
import ListingType from '../../types/listing'
import { Layout, Loader, VehicleCard, Button } from '../../components'
import { getVehicleCardProps } from '~/utils/helpers'
import { useTranslation } from 'react-i18next'


const formName = 'editListingForm';



const ListingsPage = () => {
  const [_, setLastUpdateId] = useState(null);
  const loading = useSelector(myListingsLoadingSelector)
  const listings: ListingType[] = useSelector(myListingsSelector)
  const dispatch = useDispatch()
  const isUpdatingListing = useSelector(loadingUpdatingMyListing)
  const { t } = useTranslation()
  const formValues = useSelector(getFormValues(formName))
  
  useEffect(() => {
    dispatch(ListingsCreator.fetchMyListings())
  }, [])

  console.log('listings', listings);
  useEffect(() => {
    if (listings) {
      map(listings, listing => {
        console.log('change', listing)
        dispatch(change(formName, `${listing._id}-price`, listing.price));
      });
    }
  }, [listings])


  return (
    <Layout fullscreen className={styles.container}>
      <h1>Listings</h1>
      <Loader loading={loading} centered />
      <form className={styles.listings} onSubmit={(e) => { e.preventDefault() }}>
        {map(listings, listing => {
          const isSold = !!listing.soldAt;
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
                <Button
                  type={Button.types.GHOST}
                  color="red"
                  className={styles.soldButton}
                  disabled={isUpdatingListing}
                  onClick={() => {
                    {/* @ts-ignore */ }
                    setLastUpdateId(listing._id);
                    dispatch(
                      ListingsCreator.updateMyListing({
                        _id: listing._id,
                        soldAt: isSold ? null : new Date(),
                      })
                    )
                  }}
                >
                  {t(isSold ? 'label.available' : 'label.sold')}
                </Button>
                <VehicleCard
                  {...getVehicleCardProps(listing)}
                  listingId={listing._id}
                  isSold={isSold}
                  isAdmin
                  formName={formName}
                  onEditCallback={() => {
                    const formPrice = get(formValues, `${listing._id}-price`);
                    if (formPrice && formPrice.toString() !== listing.price.toString()) {
                      const discountPercentage = (Number(listing.price) - Number(formPrice)) / Number(formPrice) * 100;
                      
                      dispatch(
                        ListingsCreator.updateMyListing({
                          _id: listing._id,
                          price: formPrice,
                          ... (discountPercentage > 0 ? { discountPercentage } : {}),
                        })
                      )
                    }
                    
                  }}
                />
              </div>
            </div>
          )
        })}
      </form>
    </Layout>
  )
}
const ListingsPageForm = reduxForm({
  enableReinitialize: true,
  form: formName,
})(ListingsPage)

export default ListingsPageForm
