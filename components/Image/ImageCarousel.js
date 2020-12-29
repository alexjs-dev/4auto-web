import React, { useState } from 'react'
import { map, orderBy, get, slice } from 'lodash'
import { BaseButton } from '~components'
import useViewport from '~hooks/useViewport'
import classNames from 'classnames'
import ArrowDownIcon from '~public/icons/arrow-down.svg'
import styles from './ImageCarousel.module.scss'

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

const ImageCarousel = () => {
  const orderedImages = orderBy(images, (image) => image.order)
  const [activeImage, setActiveImage] = useState(0)
  const { isMobile } = useViewport()
  const imagesList = isMobile ? slice(orderedImages, 0, 3) : orderedImages
  const paginate = () => {
    const last = activeImage >= orderedImages.length - 1
    if (last) setActiveImage(0)
    else setActiveImage(activeImage + 1)
  }
  return (
    <div className={styles.container}>
      <img src={get(orderedImages, `${activeImage}.url`, '')} alt="Image" />
      <div className={styles.carousel}>
        {map(imagesList, ({ url }, key) => (
          <img
            key={key}
            src={url}
            className={classNames(activeImage === key && styles.active)}
            alt="Image"
            onClick={() => setActiveImage(key)}
          />
        ))}
        {isMobile && (
          <BaseButton onClick={paginate}>
            <ArrowDownIcon />
          </BaseButton>
        )}
      </div>
    </div>
  )
}

export default ImageCarousel
