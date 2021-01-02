import React from 'react'
import Carousel from 'react-multi-carousel'
import map from 'lodash/map'
import styles from './ImageListModal.module.scss'

const images = [
  {
    order: 0,
    url:
      'https://res.cloudinary.com/forautocloud/image/upload/v1609281406/static/retro-cars-4x-3-1449178_ddlb89.jpg',
  },
  {
    order: 1,
    url:
      'https://res.cloudinary.com/forautocloud/image/upload/v1609281363/static/muscle-car-1450136_dveklt.jpg',
  },
  {
    order: 2,
    url:
      'https://res.cloudinary.com/forautocloud/image/upload/v1609281363/static/old-car-1450730_ucwanx.jpg',
  },
  {
    order: 3,
    url:
      'https://res.cloudinary.com/forautocloud/image/upload/v1609281406/static/retro-cars-4x-3-1449178_ddlb89.jpg',
  },
  {
    order: 4,
    url:
      'https://res.cloudinary.com/forautocloud/image/upload/v1609281363/static/muscle-car-1450136_dveklt.jpg',
  },
  {
    order: 5,
    url:
      'https://res.cloudinary.com/forautocloud/image/upload/v1609281363/static/old-car-1450730_ucwanx.jpg',
  },
]

const ImageListModal = () => {
  const responsive = {
    any: {
      breakpoint: { max: 4000, min: 0 },
      items: 1,
    },
  }
  return (
    <div className={styles.container}>
      <Carousel
        ssr
        infinite
        showDots
        arrows={false}
        draggable
        swipeable
        autoPlay={false}
        responsive={responsive}
      >
        {map(images, (image, index) => (
          <img key={index} src={image.url} alt="Image" draggable="false" />
        ))}
      </Carousel>
    </div>
  )
}

export default ImageListModal
