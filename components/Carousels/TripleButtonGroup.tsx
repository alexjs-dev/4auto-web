import React, { useEffect, useState } from 'react'
import { CarouselInternalState } from 'react-multi-carousel'
import { InfiniteBullets } from '../'
import usePaginationAnim from '../../hooks/usePaginationAnim'

type Props = {
  carouselState?: CarouselInternalState
}

const TripleButtonGroup: React.FunctionComponent<Props> = ({
  carouselState,
}) => {
  const slide = carouselState?.currentSlide || 0
  const {
    setSlideRightAnim,
    setSlideLeftAnim,
    ...slideAnimProps
  } = usePaginationAnim()
  const [prevSlideIndex, setSlideIndex] = useState<number | null>(null)
  useEffect(() => {
    setSlideIndex(slide)
    if (prevSlideIndex && slide > prevSlideIndex) setSlideRightAnim(true)
    else setSlideLeftAnim(true)
  }, [slide])
  return <InfiniteBullets {...slideAnimProps} />
}

export default TripleButtonGroup
