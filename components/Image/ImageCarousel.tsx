import React, { useState } from 'react'
import { map, orderBy, get } from 'lodash'
import { BaseButton } from '../'
import { useDispatch } from 'react-redux'
import useViewport from '../../hooks/useViewport'
import { FiMaximize } from 'react-icons/fi'
import classNames from 'classnames'
import ModalCreators from '../../store/menu/creators'
/* @ts-ignore */
import ArrowDownIcon from '../../public/icons/arrow-down.svg'
import styles from './ImageCarousel.module.scss'
import modalTypes from '../../consts/modals'
import ImageType from '../../types/image'

type Props = {
  images: ImageType[]
}

const ImageCarousel: React.FunctionComponent<Props> = ({ images }) => {
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
      {/* @ts-ignore */}
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
            {/* @ts-ignore */}
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
