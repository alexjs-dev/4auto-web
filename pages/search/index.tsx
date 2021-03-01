import React from 'react'
import { useSelector } from 'react-redux'
import {
  SearchForm,
  ListingsCarousel,
  InfinitePagination,
  Layout,
} from '../../components'
import {
  vehiclesPaginationSelector,
  listingsSelector,
} from '../../store/vehicles/selectors'
import styles from './search.module.scss'

const SearchPage: React.FunctionComponent = () => {
  // const { query } = useRouter()
  const pagination = useSelector(vehiclesPaginationSelector)
  const listings = useSelector(listingsSelector)
  return (
    <Layout background="gray" fullscreen>
      <div className={styles.search}>
        <SearchForm fluid />
      </div>
      <ListingsCarousel listings={listings} title="Featured vehicles" />
      <InfinitePagination pagination={pagination} items={listings} />
    </Layout>
  )
}

export default SearchPage
