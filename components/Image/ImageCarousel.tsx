import React, { useState } from 'react'
import { map, orderBy, get } from 'lodash'
import { useTranslation } from 'react-i18next'
/* @ts-ignore */
import { LazyLoadImage } from 'react-lazy-load-image-component'
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
import { parseCloudinaryUrl, placeholderImageUrl } from '~/utils/helpers'

type Props = {
  images: ImageType[]
}

const ImageCarousel: React.FunctionComponent<Props> = ({ images }) => {
  const orderedImages = orderBy(images, (image) => image.order)
  const [activeImage, setActiveImage] = useState(0)
  const { isMobile } = useViewport()
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const paginate = () => {
    const last = activeImage >= orderedImages.length - 1
    if (last) setActiveImage(0)
    else setActiveImage(activeImage + 1)
  }
  return (
    <div className={styles.container}>
      <LazyLoadImage
        placeholderSrc={placeholderImageUrl}
        src={parseCloudinaryUrl(get(orderedImages, `${activeImage}.url`))}
        effect="blur"
        alt={t('vehicle.vehicle')}
      />

      {/* @ts-ignore */}
      <button
        className={styles.expandButton}
        onClick={() => {
          dispatch(
            ModalCreators.openModal(modalTypes.IMAGE_LIST_MODAL, { images })
          )
        }}
      >
        <FiMaximize />
      </button>

      <div className={styles.carousel}>
        {map(orderedImages, ({ url }, key) => (
          <LazyLoadImage
            key={key}
            placeholderSrc={placeholderImageUrl}
            src={parseCloudinaryUrl(url)}
            effect="blur"
            className={classNames(activeImage === key && styles.active)}
            onClick={() => setActiveImage(key)}
            alt={t('vehicle.vehicle')}
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
