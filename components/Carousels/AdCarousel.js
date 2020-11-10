import React from 'react'
import Carousel from 'react-multi-carousel'
import { map } from 'lodash'
import { AdBanner } from '~components'
import adsList from '~ads'
import useViewport from '~hooks/useViewport'
import styles from './AdCarousel.module.scss'

const AdCarousel = () => {
  const { isMobile } = useViewport()
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
        arrows={!isMobile}
        draggable
        swipeable
        autoPlay
        responsive={responsive}
        autoPlaySpeed={7000}
      >
        {map(adsList, (ad, index) => (
          <AdBanner key={index} {...ad} />
        ))}
      </Carousel>
    </div>
  )
}

export default AdCarousel
