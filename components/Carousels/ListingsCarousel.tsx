import React from 'react'
import map from 'lodash/map'
import Carousel from 'react-multi-carousel'
import styles from './ListingsCarousel.module.scss'
import useViewport from '../../hooks/useViewport'
import { VehicleCard, TripleButtonGroup } from '../'
import ListingType from '../../types/listing'
import { getVehicleCardProps } from '../../utils/helpers'

type Props = {
  title: string
  listings: ListingType
}

const ListingsCarousel: React.FunctionComponent<Props> = ({
  listings,
  title,
}) => {
  const { isMobile } = useViewport()
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1441 },
      items: 4,
      slidesToSlide: 4,
    },
    desktop: {
      breakpoint: { max: 1440, min: 1281 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1280, min: 990 },
      items: 3,
      slidesToSlide: 3,
    },
    mobile: {
      centerMode: true,
      breakpoint: { max: 989, min: 0 },
      items: 2,
      slidesToSlide: 2,
    },
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>{title}</h1>
        <Carousel
          ssr
          infinite
          showDots={false}
          arrows={!isMobile}
          renderButtonGroupOutside
          draggable
          swipeable
          autoPlay={false}
          responsive={responsive}
          autoPlaySpeed={5000}
          customButtonGroup={<TripleButtonGroup />}
        >
          {map(listings, (listing, i) => (
            <VehicleCard key={i} {...getVehicleCardProps(listing)} />
          ))}
        </Carousel>
      </div>
    </div>
  )
}

export default React.memo(ListingsCarousel)