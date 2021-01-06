import React from 'react'
import { map, size } from 'lodash'
import { useDispatch } from 'react-redux'
import Creators from '~store/vehicles/creators'
import InfiniteScroll from 'react-infinite-scroll-component'
import styles from './InfinitePagination.module.scss'
import { VehicleCard, Loader } from '~components'
import { getVehicleCardProps } from '~utils/helpers'

const InfinitePagination = ({ pagination, items }) => {
  const total = pagination?.total || 0
  const count = size(items)
  const hasMore = total > count
  const dispatch = useDispatch()

  const onPaginate = () => {
    dispatch(Creators.fetchListings())
  }
  return (
    <div className={styles.container}>
      <h1>All vehicles</h1>
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
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        // below props only if you need pull down functionality
        refreshFunction={() => console.log('refresh')}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
        }
      >
        <div className={styles.list}>
          {map(items, (item, key) => (
            <VehicleCard key={key} {...getVehicleCardProps(item)} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default InfinitePagination
