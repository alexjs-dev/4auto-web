import React, { useState } from 'react'
import { map, orderBy, get } from 'lodash'
import { BaseButton } from '~components'
import { useDispatch } from 'react-redux'
import useViewport from '~hooks/useViewport'
import { FiMaximize } from 'react-icons/fi'
import classNames from 'classnames'
import ModalCreators from '~store/menu/creators'
import ArrowDownIcon from '~public/icons/arrow-down.svg'
import styles from './ImageCarousel.module.scss'
import modalTypes from '~consts/modals'

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
  const dispatch = useDispatch()

  const paginate = () => {
    const last = activeImage >= orderedImages.length - 1
    if (last) setActiveImage(0)
    else setActiveImage(activeImage + 1)
  }
  return (
    <div className={styles.container}>
      <img
        src={get(orderedImages, `${activeImage}.url`, '')}
        alt="Image"
        draggable="false"
      />

      <BaseButton
        className={styles.expandButton}
        onClick={() =>
          dispatch(ModalCreators.openModal(modalTypes.IMAGE_LIST_MODAL))
        }
      >
        <FiMaximize />
      </BaseButton>

      <div className={styles.carousel}>
        {map(orderedImages, ({ url }, key) => (
          <img
            key={key}
            src={url}
            className={classNames(activeImage === key && styles.active)}
            alt="Image"
            draggable="false"
            onClick={() => setActiveImage(key)}
          />
        ))}
        {isMobile && (
          <>
            <BaseButton onClick={paginate} className={styles.paginateButton}>
              <ArrowDownIcon />
            </BaseButton>
          </>
        )}
      </div>
    </div>
  )
}

export default ImageCarousel
