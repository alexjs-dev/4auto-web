import React from 'react'
import { useSelector } from 'react-redux'
import map from 'lodash/map'
import get from 'lodash/get'
import { Carousel } from 'react-responsive-carousel'
import { modalProps } from '../../store/menu/selectors'
import styles from './ImageListModal.module.scss'

const ImageListModal = () => {
  const props = useSelector(modalProps)
  const images = get(props, 'images', [])
  return (
    <div className={styles.container}>
      <Carousel
        showThumbs={false}
        infiniteLoop
        emulateTouch
        swipeable
        useKeyboardArrows
        showIndicators
        showStatus={false}
        showArrows
      >
        {map(images, (image) => (
          <div key={image.order}>
            <img src={image.url} alt={image.order} draggable="false" />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default ImageListModal
