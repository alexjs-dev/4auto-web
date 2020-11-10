import { useState, useEffect } from 'react'

const usePaginationAnim = (delay = 500) => {
  const [slideLeftAnim, setSlideLeftAnim] = useState(false)
  const [slideRightAnim, setSlideRightAnim] = useState(false)

  useEffect(() => {
    if (!slideLeftAnim) return
    const timeout = setTimeout(() => {
      setSlideLeftAnim(false)
    }, delay)
    return () => {
      clearTimeout(timeout)
    }
  }, [slideLeftAnim])

  useEffect(() => {
    if (!slideRightAnim) return
    const timeout = setTimeout(() => {
      setSlideRightAnim(false)
    }, delay)
    return () => {
      clearTimeout(timeout)
    }
  }, [slideRightAnim])

  return { slideLeftAnim, slideRightAnim, setSlideLeftAnim, setSlideRightAnim }
}

export default usePaginationAnim
