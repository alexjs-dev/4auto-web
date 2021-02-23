import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import map from 'lodash/map'
import ListingType from '../../../types/listing'
import styles from '../listing.module.scss'

type Props = {
  listing?: ListingType
}

const Images: React.FunctionComponent<Props> = ({ listing }) => {
  if (!listing) return null
  return (
    <Carousel
      showThumbs={false}
      infiniteLoop
      emulateTouch
      swipeable
      useKeyboardArrows
      showIndicators
      showStatus={false}
      showArrows
      className={styles.images}
    >
      {map(listing.vehicle.images, (image) => (
        <div key={image.order}>
          <img
            src={image.url}
            alt={(image.order && image.order.toString()) || ''}
            draggable="false"
          />
        </div>
      ))}
    </Carousel>
  )
}

export default Images
