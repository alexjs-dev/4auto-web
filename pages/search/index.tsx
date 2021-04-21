import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { change } from 'redux-form' // tslint:disable
import get from 'lodash/get'
import toNumber from 'lodash/toNumber'
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
import Creators from '../../store/listing/creators'
import styles from './search.module.scss'
import { useRouter } from 'next/router'
import { fieldTypes } from '~/utils/formValidators'

const form = 'searchForm'

const SearchPage: React.FunctionComponent = () => {
  const { query } = useRouter()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const pagination = useSelector(listingPaginationSelector)
  const listings = useSelector(listingsSelector)
  const count = get(pagination, 'total', 0)

  const fetch = (resetPagination = false) => {
      dispatch(Creators.fetchListings({
        resetPagination,
        ...(query.pricemin ? { 'price[$gte]': query.pricemin } : {}),
        ...(query.pricemax ? { 'price[$lte]': toNumber(get(query, 'pricemax', 0)) + 1 } : {}),
      }))
  }
  useEffect(() => {
    if (query) {
      fetch();
      if (query.pricemin) {
        dispatch(change(form, `${fieldTypes.price}.min`, query.pricemin))
      }
      if (query.pricemax) {
        dispatch(change(form, `${fieldTypes.price}.max`, query.pricemax))
      }
    }
  }, [query])
  return (
    <Layout background="white" fullscreen>
      <div className={styles.search}>
        <h1>{`${t('titles.foundVehicles')}: ${count}`}</h1>
        <SearchForm cb={() => fetch(true)} fluid />
      </div>
      <ListingsCarousel type="FEATURED" title={t('titles.featuredVehicles')} />
      <InfinitePagination
        title={`${t('titles.foundVehicles')} ${count}`}
        pagination={pagination}
        items={listings}
      />
    </Layout>
  )
}

export default SearchPage
