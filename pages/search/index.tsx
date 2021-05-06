import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { change } from 'redux-form' // tslint:disable
import get from 'lodash/get'
import includes from 'lodash/includes'
import some from 'lodash/some'
import keys from 'lodash/keys'
import isEmpty from 'lodash/isEmpty'
import toNumber from 'lodash/toNumber'
import {
  SearchForm,
  ListingsCarousel,
  InfinitePagination,
  Layout,
  Loader,
} from '../../components'
import {
  listingPaginationSelector,
  listingsSelector,
  listingsLoadingSelector,
} from '../../store/listing/selectors'
import Creators from '../../store/listing/creators'
import styles from './search.module.scss'
import { useRouter } from 'next/router'
import { fieldTypes } from '~/utils/formValidators'
import { makesSelector } from '~/store/vehicles/selectors'

const form = 'searchForm'

const normalizeSearchQuery = (query: any) => {
  console.log('query', query)
  return {
    ...(query.pricemin ? { 'price[$gte]': query.pricemin } : {}),
    ...(query.pricemax
      ? { 'price[$lte]': toNumber(get(query, 'pricemax', 0)) + 1 }
      : {}),
    ...(query.model ? { 'vehicle.modelId': query.model } : {}),
    ...(query.make ? { 'vehicle.makeId': query.make } : {}),
    ...(query.transmission
      ? { 'vehicle.transmission': query.transmission }
      : {}),
    ...(query.fuel ? { 'vehicle.fuel': query.fuel } : {}),
    ...(query.color ? { 'vehicle.color': query.color } : {}),
    ...(query.bodyType
      ? {
          'vehicle.bodyType': {
            $in: query.bodyType,
          },
        }
      : {}),
  }
}

//     roomId: {
// $in: [ 2, 5 ]
// }

const SearchPage: React.FunctionComponent = () => {
  const { query } = useRouter()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const pagination = useSelector(listingPaginationSelector)
  const listings = useSelector(listingsSelector)
  const makes = useSelector(makesSelector)
  const loading = useSelector(listingsLoadingSelector)
  const count = get(pagination, 'total', 0)

  const fetch = (resetPagination = false) => {
    dispatch(
      Creators.fetchListings({
        resetPagination,
        ...normalizeSearchQuery(query),
      })
    )
  }
  useEffect(() => {
    if (query) {
      fetch()
      if (query.pricemin) {
        dispatch(change(form, `${fieldTypes.price}.min`, query.pricemin))
      }
      if (query.pricemax) {
        dispatch(change(form, `${fieldTypes.price}.max`, query.pricemax))
      }
      if (query.yearmax) {
        dispatch(change(form, `${fieldTypes.year}.max`, query.yearmax))
      }
      if (query.yearmin) {
        dispatch(change(form, `${fieldTypes.year}.min`, query.yearmin))
      }
      if (query.color) {
        dispatch(change(form, `${fieldTypes.color}`, query.color))
      }
      if (query.bodyType) {
        dispatch(change(form, `${fieldTypes.bodyType}`, query.bodyType))
      }
      if (query.transmission) {
        dispatch(change(form, `${fieldTypes.gearbox}`, query.transmission))
      }
      if (query.fuel) {
        dispatch(change(form, `${fieldTypes.fuel}`, query.fuel))
      }
      if (query.make) {
        dispatch(change(form, `${fieldTypes.make}`, query.make))
      }
    }
  }, [query])

  useEffect(() => {
    if (!isEmpty(makes) && query) {
      if (query.model) {
        setTimeout(() => {
          dispatch(change(form, `${fieldTypes.model}`, query.model))
        }, 300)
      }
    }
  }, [makes])

  const queryKeys = keys(query)

  const defaultExpanded = some(
    ['color', 'pricemin', 'pricemax', 'yearmin', 'yearmax'],
    (key) => includes(queryKeys, key)
  )

  return (
    <Layout background="white" fullscreen className={styles.layout}>
      <div className={styles.search}>
        {loading && <Loader loading />}
        {!loading && <h1>{`${t('titles.foundVehicles')}: ${count}`}</h1>}
        <SearchForm
          cb={() => fetch(true)}
          defaultExpanded={defaultExpanded}
          fluid
        />
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
