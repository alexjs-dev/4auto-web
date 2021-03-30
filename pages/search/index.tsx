import React from 'react'
import { useSelector } from 'react-redux'
import {
  SearchForm,
  ListingsCarousel,
  InfinitePagination,
  Layout,
} from '../../components'
import {
  listingPaginationSelector,
  listingsSelector,
} from '../../store/listing/selectors'
import styles from './search.module.scss'

const SearchPage: React.FunctionComponent = () => {
  // const { query } = useRouter()
  const pagination = useSelector(listingPaginationSelector)
  const listings = useSelector(listingsSelector)
  return (
    <Layout background="white" fullscreen>
      <div className={styles.search}>
        <h1>Found: 21</h1>
        <SearchForm fluid />
      </div>
      <ListingsCarousel listings={listings} title="Featured vehicles" />
      <InfinitePagination
        title="Search results (20)"
        pagination={pagination}
        items={listings}
      />
    </Layout>
  )
}

export default SearchPage
