import React from 'react'
import { map, size } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Creators from '../../store/listing/creators'
import { listingsLoadingSelector } from '../../store/listing/selectors'
import styles from './InfinitePagination.module.scss'
import { VehicleCard, Button } from '../../components'
import { getVehicleCardProps } from '../../utils/helpers'

type Pagination = {
  total?: number
}

type Props = {
  title?: string
  items: any[]
  pagination: Pagination
}

const InfinitePagination: React.FunctionComponent<Props> = ({
  pagination,
  items,
  title,
}) => {
  const total = pagination?.total || 0
  const count = size(items)
  const hasMore = total > count
  const loading = useSelector(listingsLoadingSelector)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const onPaginate = () => {
    if (!loading && hasMore) {
      dispatch(Creators.fetchListings())
    }
  }
  return (
    <div className={styles.container}>
      <h1>{title ? title : t('titles.allVehicles')}</h1>
      <div className={styles.carousel}>
        <div className={styles.list}>
          {map(items, (item, key) => (
            <VehicleCard
              key={key}
              {...getVehicleCardProps(item)}
              listingId={item._id}
            />
          ))}
        </div>
      </div>
      <div className={styles.extra}>
        <Button
          label={t('button.findMore')}
          fluid
          disabled={!hasMore}
          onClick={onPaginate}
          loading={loading}
        />
      </div>
    </div>
  )
}

export default InfinitePagination
