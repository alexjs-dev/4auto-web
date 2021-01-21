import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Creators from '../../store/vehicles/creators'
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
  useEffect(() => {
    dispatch(Creators.fetchListings())
  }, [dispatch, Creators])

  return (
    <div className={styles.container}>
      <section className={styles.searchSection}>
        <LogoAbstract />
        <SearchForm className={styles.searchForm} />
      </section>
      <Layout>
        <ListingsCarousel listings={listings} title="Featured vehicles" />
      </Layout>
      <AdCarousel />
      <Layout>
        <VehicleOfTheDay />
        <ListingsCarousel listings={listings} title="Recommended vehicles" />
        <ListingsCarousel listings={listings} title="Latest vehicles" />
        <InfinitePagination pagination={pagination} items={listings} />
      </Layout>
    </div>
  )
}

export default LandingPage
