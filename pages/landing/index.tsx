import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Creators from '../../store/vehicles/creators'
import head from 'lodash/head'
import values from 'lodash/values'
import { useTranslation } from 'react-i18next'
import {
  LogoAbstract,
  SearchForm,
  ListingsCarousel,
  AdCarousel,
  InfinitePagination,
  VehicleOfTheDay,
  Layout,
} from '../../components'
import {
  vehiclesPaginationSelector,
  listingsSelector,
} from '../../store/vehicles/selectors'
import styles from './landing.module.scss'

const LandingPage: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const pagination = useSelector(vehiclesPaginationSelector)
  const listings = useSelector(listingsSelector)
  const { t } = useTranslation()
  useEffect(() => {
    dispatch(Creators.fetchListings())
  }, [dispatch, Creators])

  console.log('listings', listings)

  return (
    <div className={styles.container}>
      <section className={styles.searchSection}>
        <LogoAbstract />
        <SearchForm className={styles.searchForm} />
      </section>
      <Layout>
        <ListingsCarousel
          listings={listings}
          title={t('titles.featuredVehicles')}
        />
      </Layout>
      <AdCarousel />
      <Layout>
        <VehicleOfTheDay listing={head(values(listings))} />
        <ListingsCarousel
          listings={listings}
          title={t('titles.recommendedVehicles')}
        />
        <ListingsCarousel
          listings={listings}
          title={t('titles.latestVehicles')}
        />
        <InfinitePagination pagination={pagination} items={listings} />
      </Layout>
    </div>
  )
}

export default LandingPage
