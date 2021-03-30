import React from 'react'
import { map, size } from 'lodash'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Creators from '../../store/listing/creators'
import InfiniteScroll from 'react-infinite-scroll-component'
import styles from './InfinitePagination.module.scss'
import { VehicleCard, Loader } from '../../components'
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
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const onPaginate = () => {
    dispatch(Creators.fetchListings())
  }
  return (
    <div className={styles.container}>
      <h1>{title ? title : t('titles.allVehicles')}</h1>
      <InfiniteScroll
        className={styles.carousel}
        dataLength={total} //This is important field to render the next data
        next={onPaginate}
        hasMore={hasMore}
        loader={
          <div className={styles.loader}>
            <Loader centered loading isBranded />
          </div>
        }
        endMessage={
          <div className={styles.loader}>
            <Loader centered loading isBranded={false} />
          </div>
        }
        // below props only if you need pull down functionality
        refreshFunction={() => console.log('refresh')}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>
            &#8595; {t('button.pullDownToRefresh')}
          </h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>
            &#8593; {t('button.releaseToRefresh')}
          </h3>
        }
      >
        <div className={styles.list}>
          {map(items, (item, key) => (
            <VehicleCard
              key={key}
              {...getVehicleCardProps(item)}
              listingId={item._id}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default InfinitePagination
