import React, { useEffect, useState } from 'react'
import { CarouselInternalState } from 'react-multi-carousel'
import { InfiniteBullets } from '../'
import usePaginationAnim from '../../hooks/usePaginationAnim'

type Props = {
  carouselState?: CarouselInternalState
  goToSlide?: (slide: number) => void
}

const TripleButtonGroup: React.FunctionComponent<Props> = ({
  carouselState,
  goToSlide,
}) => {
  const slide = carouselState?.currentSlide || 0
  const {
    setSlideRightAnim,
    setSlideLeftAnim,
    ...slideAnimProps
  } = usePaginationAnim()
  const [prevSlideIndex, setSlideIndex] = useState<number | null>(null)

  const onNext = () => {
    if (goToSlide) {
      goToSlide(slide + 2)
    }
  }
  const onPrev = () => {
    if (goToSlide) {
      goToSlide(slide - 2)
    }
  }
  useEffect(() => {
    setSlideIndex(slide)
    if (prevSlideIndex && slide > prevSlideIndex) setSlideRightAnim(true)
    else setSlideLeftAnim(true)
  }, [slide])
  return <InfiniteBullets {...slideAnimProps} onNext={onNext} onPrev={onPrev} />
}

export default TripleButtonGroup
