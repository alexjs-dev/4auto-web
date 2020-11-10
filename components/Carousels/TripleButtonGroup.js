import React, { useEffect, useState } from 'react'
import { InfiniteBullets } from '~components'
import usePaginationAnim from '~hooks/usePaginationAnim'

const TripleButtonGroup = ({ carouselState }) => {
  const { currentSlide } = carouselState
  const {
    setSlideRightAnim,
    setSlideLeftAnim,
    ...slideAnimProps
  } = usePaginationAnim()
  const [prevSlideIndex, setSlideIndex] = useState(null)
  useEffect(() => {
    setSlideIndex(currentSlide)
    if (currentSlide > prevSlideIndex) setSlideRightAnim(true)
    else setSlideLeftAnim(true)
  }, [currentSlide])
  return <InfiniteBullets {...slideAnimProps} />
}

export default TripleButtonGroup
