import React from 'react'
import { useSelector } from 'react-redux'
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
  listingPaginationSelector,
  listingsSelector,
} from '../../store/listing/selectors'
import styles from './landing.module.scss'

const LandingPage: React.FunctionComponent = () => {
  const pagination = useSelector(listingPaginationSelector)
  const listings = useSelector(listingsSelector)
  const { t } = useTranslation()

  return (
    <div className={styles.container}>
      <section className={styles.searchSection}>
        <LogoAbstract />
        <SearchForm className={styles.searchForm} />
      </section>
      <Layout>
        <ListingsCarousel
          type="FEATURED"
          title={t('titles.featuredVehicles')}
        />
      </Layout>
      <AdCarousel />
      <Layout>
        <VehicleOfTheDay listing={listings && Object.values(listings)[0]} />
        <ListingsCarousel
          type="RECOMMENDED"
          title={t('titles.recommendedVehicles')}
        />
        <ListingsCarousel type="DEFAULT" title={t('titles.latestVehicles')} />
        <InfinitePagination pagination={pagination} items={listings} />
      </Layout>
    </div>
  )
}

export async function getStaticPaths() {
  return { paths: [], fallback: true }
}

export default LandingPage
