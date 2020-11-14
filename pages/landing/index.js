import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Creators from '~store/vehicles/creators'
import {
  LogoAbstract,
  SearchForm,
  ListingsCarousel,
  AdCarousel,
  InfinitePagination,
} from '~components'
import {
  vehiclesPaginationSelector,
  listingsSelector,
} from '~store/vehicles/selectors'
import styles from './landing.module.scss'

const LandingPage = () => {
  const dispatch = useDispatch()
  const pagination = useSelector(vehiclesPaginationSelector)
  const listings = useSelector(listingsSelector)
  useEffect(() => {
    dispatch(Creators.fetchListings())
  }, [])

  return (
    <div className={styles.container}>
      <section className={styles.searchSection}>
        <LogoAbstract />
        <SearchForm className={styles.searchForm} />
      </section>
      <div className={styles.layout}>
        <ListingsCarousel listings={listings} title="Featured vehicles" />
        <AdCarousel />
        <ListingsCarousel listings={listings} title="Recommended vehicles" />
        <ListingsCarousel listings={listings} title="Latest vehicles" />
        <InfinitePagination pagination={pagination} items={listings} />
      </div>
    </div>
  )
}

export default LandingPage
