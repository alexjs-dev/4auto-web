import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
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
import styles from './search.module.scss'

const SearchPage: React.FunctionComponent = () => {
  const { query } = useRouter()
  const pagination = useSelector(vehiclesPaginationSelector)
  const listings = useSelector(listingsSelector)
  return (
    <Layout background="gray" fullscreen>
      <div className={styles.search}>
        <SearchForm fluid />
      </div>
      <InfinitePagination pagination={pagination} items={listings} />
      <ListingsCarousel listings={listings} title="Featured vehicles" />
    </Layout>
  )
}

export default SearchPage
